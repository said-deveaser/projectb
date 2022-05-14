import express from 'express';
import {responseError, wrongParamsOrUrl} from '../../helpers/helpers';
import jwt from 'jsonwebtoken'
import {JWT_SECRET_KEY} from '../../../config/config';
import {StatusCode} from '../../types';
import {Token} from '../../../db/Models/Token';
import {DateHelper} from '../../../helpers/helpers';
import logging from '../../../core/Logging/Logging';
import {withAdminToken} from "../../middlewares/withAdminToken";

export namespace Auth {
  export const routerEndpoint = '/auth'
  export const router = express.Router()

  interface ITokenQueryParams {
    partner: string
    date_expire: string
  }
  /*get user token*/
  router.post('/token', (req,res) => {
    const query = req.query as never as ITokenQueryParams
    /*
     #swagger.description = 'Получить новый токен юзера'
     #swagger.summary = 'Получить токен юзера'
     #swagger.tags = ['Новый токен юзера (Права админа)']
     #swagger.path = '/auth/token'
     #swagger.parameters['partner'] = {
       description: 'Токен партнера',
       required: true
     }
     #swagger.parameters['date_expire'] = {
       description: 'Дата окончания работы токена, по умолчанию 1мес, максимум год',
       required: false,
       schema: "10.10.2010"
     }
     #swagger.responses[200] = {
         description: 'Новый токен пользователя. Если токен не авторизуют в течении 24 часов, то он становится недействительным:',
         schema: {
          user_token: 'string',
          expire_date: '10.10.2023'
         }
     } */

    if (!query['partner']) {
      wrongParamsOrUrl(res)
      return
    }
    if (!process.env['PARTNER_TOKEN']) {
      responseError(res, {
        message: 'invalid enviroment',
        status: StatusCode.InternalServerError
      })
      return
    }
    if (query.partner !== process.env['PARTNER_TOKEN']) {
      responseError(res, {
        message: 'WRONG TOKEN',
        status: StatusCode.Forbidden
      })
      return;
    }
    const nowDate = new Date()
    let expireDate = new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, nowDate.getDate())
    if (query.date_expire) {
      try {
        expireDate = DateHelper.parse(query.date_expire)
        if (expireDate < nowDate) {
          responseError(res, {
            message: 'ExpireDate cannot be earler now',
            status: StatusCode.Forbidden
          })
          return;
        }
        if (expireDate > (new Date(nowDate.getFullYear()+1, nowDate.getMonth(), nowDate.getDate()))) {
          responseError(res, {
            message: 'ExpireDate cannot be later then ' + DateHelper.stringify(new Date(nowDate.getFullYear()+1, nowDate.getMonth(), nowDate.getDate())),
            status: StatusCode.Forbidden
          })
          return;
        }
      } catch (e) {
        wrongParamsOrUrl(res)
        return;
      }
    }
    const token = jwt.sign({
      date: new Date
    }, JWT_SECRET_KEY)

    const newUserToken = new Token({
      token:token,
      time_create: nowDate,
      time_expired: new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate()+1, nowDate.getHours(), nowDate.getMinutes(), nowDate.getSeconds()),
      authorized_expire_time:expireDate,
    })
    newUserToken.save().then(result => {
      res.send({
        userToken: token,
        expire_date: DateHelper.stringify(expireDate),
      })
    }).catch((e) => {
      logging.error('bd save error')
      console.error(e)
      responseError(res, {
        status: 500,
        message: 'bd save error'
      })
    })

  })

  interface IRegisterReqData {
    user_token: 'token',
    user_login: 'telegram_name'
  }
  /*register user*/
  router.put('/register', async (req,res) => {
    const reqBody = req.body as IRegisterReqData
    /*
     #swagger.description = 'Привязать токен юзера к его логину и активировать токен'
     #swagger.summary = 'Зарегестрировать пользователя'
     #swagger.tags = ['Авторизация']
     #swagger.path = '/auth/register'
     #swagger.parameters['data'] = {
       in: 'body',
       description: 'Токен юзера и Логин',
       type: 'string',
       format: 'json',
       required: true,
       schema: {"user_token": "token", "user_login": "telegram_name"}
     }
     #swagger.responses[200] = {
         description: 'Возращается токен пользователя. Уже зарегестрированый:',
         schema: {
          user_token: 'string',
          expire_date: '10.10.2023'
         }
     } */

    if (!reqBody.user_token || !reqBody.user_login) {
      responseError(res, {
        message: 'Неверный параметр data',
        status: StatusCode.Forbidden
      })
      return
    }
    try {
      const token = await Token.findOne({token: reqBody.user_token})
      if (!token) {
        responseError(res, {
          message: 'Нет такого зарегестрированого токена',
          status: StatusCode.Forbidden
        })
        return
      }
      if (token.user_id) {
        responseError(res, {
          message: 'Уже зарегестрированный токен',
          status: StatusCode.Forbidden
        })
        return
      }
      token.user_id = reqBody.user_login
      await token.save()
      res.send(JSON.stringify({
        test: req.body,
        findedToken: token.token
      }))
    } catch (e) {
      responseError(res, {
        message: 'bd error or something',
        status: StatusCode.InternalServerError
      })
      return
    }

  })

  router.delete('/register', withAdminToken, async (req,res) => {
    const query = req.query as never as Partial<IRegisterReqData>
    /*
     #swagger.description = 'Удалить токен юзера (Права админа)'
     #swagger.summary = 'Удалить токен (Права админа)'
     #swagger.tags = ['Авторизация']
     #swagger.path = '/auth/register'
     #swagger.parameters['user_token'] = {
       in: 'query',
       required: true,
       description: 'Токен юзера ',
       type: 'string',
       format: 'json',
       schema: "token"
     }
     #swagger.parameters['adm_token'] = {
       in: 'header',
       required: true,
       description: 'Токен админа',
       type: 'string',
       schema: "token"
     }
     #swagger.responses[200] = {
         description: 'Удаляет токен из базы:'
     } */

    if (!query.user_token) {
      responseError(res, {
        message: 'Нет параметров',
        status: StatusCode.Forbidden
      })
      return
    }
    try {
      const token = await Token.findOne({token: query.user_token})
      if (!token) {
        responseError(res, {
          message: 'Такого токена не найдено',
          status: StatusCode.Forbidden
        })
        return
      }
      await token.delete()
      res.send()
    } catch (e) {
      console.log(e)
      responseError(res, {
        message: 'bd error or something',
        status: StatusCode.InternalServerError,
      })
    }

  })
}


