import {Response} from 'express';
import {StatusCode} from '../types';

export const wrongParamsOrUrl = (res: Response) => {
  res.status(StatusCode.Forbidden)
  res.send(JSON.stringify({
    message: 'Неверные параметры запроса или элементы URL'
  }))
}

type ResponseErrorOptions = {
  status: StatusCode,
  message: string
}
export const responseError = (res: Response, options: ResponseErrorOptions) => {
  res.status(options.status)
  res.send(JSON.stringify({
    message: options.message
  }))
}
