import express from 'express';
import {responseError, wrongParamsOrUrl} from '../../helpers/helpers';
import jwt from 'jsonwebtoken'
import {JWT_SECRET_KEY} from '../../../config/config';
import {StatusCode} from '../../types';
import {Token} from '../../../db/Models/Token';
import {DateHelper} from '../../../helpers/helpers';
import logging from '../../../core/Logging/Logging';

export namespace Auth {
  export const routerEndpoint = '/auth'
  export const router = express.Router()

  interface ITokenQueryParams {
    partner: string
    date_expire: string
  }
  router.post('/token', (req,res) => {
    const query = req.query as never as ITokenQueryParams
    /*
     #swagger.description = 'Получить новый токен'
     #swagger.summary = 'Токен'
     #swagger.tags = ['Авторизация']
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
         schema: { user_token: 'string' }
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
      res.send({userToken: token})
    }).catch((e) => {
      logging.error('bd save error')
      console.error(e)
      responseError(res, {
        status: 500,
        message: 'bd save error'
      })
    })

  })
}


