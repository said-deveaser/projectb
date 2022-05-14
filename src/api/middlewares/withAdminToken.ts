import {NextFunction, Request, Response} from 'express';
import {responseError} from '../helpers/helpers';
import {StatusCode} from '../types';

export const withAdminToken = (req: Request, res: Response, next: NextFunction) => {
  const admToken = req.header('adm_token')
  if (!admToken) {
    responseError(res, {
      message: 'Необходимо указать токен Админа в заголовках',
      status: StatusCode.Forbidden
    })
    return
  }
  if (admToken !== process.env['PARTNER_TOKEN']) {
    responseError(res, {
      message: 'Неверный токен',
      status: StatusCode.Forbidden
    })
    return;
  }
  next()
}
