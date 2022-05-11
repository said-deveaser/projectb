import {Response} from 'express';
import {StatusCode} from '../types';

export const wrongParamsOrUrl = (res: Response) => {
  res.status(StatusCode.Forbidden)
  res.send(JSON.stringify({
    message: 'Неверные параметры запроса или элементы URL'
  }))
}
