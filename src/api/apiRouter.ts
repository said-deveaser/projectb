import express from 'express';
import {Auth} from './routers/auth/authRouter';
import {WaDictionaries} from './routers/wa-dictionaries/waDictionariesRouter';
import {DBConnect} from '../db/DBConnect';
import {responseError} from './helpers/helpers';

export namespace Api {
  export const apiRouterEndpoint = '/api'
  export const apiRouter = express.Router()

  apiRouter.use((req,res,next) => {
    DBConnect.connectAsync().then(() => {
      next()
    }).catch(e => {
      console.error(e)
      responseError(res, {
        message: 'db connection failed',
        status: 500
      })
    })
  })
  apiRouter.use((req, res, next) => {
    res.set({'Content-Type': 'application/json; charset=utf-8'})
    next()
  })
  apiRouter.use(Auth.routerEndpoint, Auth.router)

  apiRouter.use(WaDictionaries.routerEndpoint, WaDictionaries.router)

}
