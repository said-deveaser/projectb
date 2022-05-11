import {Middleware} from './types';
import {StatusCode} from '../types';

export const withAuthMiddleware:Middleware = async (req, res, next) => {
  const isAuthed = true
  if (!isAuthed) {
    res.status(StatusCode.Unauthorized)
    res.send(JSON.stringify({
      message: 'Нужно авторизоваться'
    }))
    return
  }
  next()
}
