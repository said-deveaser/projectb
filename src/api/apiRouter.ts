import express from 'express';
import {Auth} from './routers/auth/authRouter';
import {WaDictionaries} from './routers/wa-dictionaries/waDictionaries';

export namespace Api {
  export const apiRouterEndpoint = '/api'
  export const apiRouter = express.Router()

  apiRouter.use((req, res, next) => {
    res.set({'Content-Type': 'application/json; charset=utf-8'})
    next()
  })
  apiRouter.use(Auth.routerEndpoint, Auth.router)

  apiRouter.use(WaDictionaries.routerEndpoint, WaDictionaries.router)

}
