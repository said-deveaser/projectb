import {Middleware} from './types';
import {StatusCode} from '../types';
import {responseError} from '../helpers/helpers';
import {Token} from '../../db/Models/Token';

export const withAuthMiddleware:Middleware = async (req, res, next) => {
  const userToken = req.header('user_token')
  if (!userToken) {
    responseError(res, {
      message: 'Нужно авторизоваться',
      status: StatusCode.Forbidden
    })
    return
  }
  const token = await Token.findOne({token: userToken})
  if (!token) {
    responseError(res, {
      message: 'Токен не сущесвтует',
      status: StatusCode.Forbidden
    })
    return
  }
  if (!token.isTokenRegistered()) {
    responseError(res, {
      message: 'Токен не зарегестрирован',
      status: StatusCode.Forbidden
    })
    return
  }
  if (!token.isTokenActive()) {
    responseError(res, {
      message: 'Токен просрочен',
      status: StatusCode.Forbidden
    })
    return
  }
  next()
}
