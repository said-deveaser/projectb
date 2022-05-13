import express from "express";
import {ApiDoc} from "./api-doc/apiDocRouter";

export namespace Public {
  export const routerEndpoint = '/'
  export const router = express.Router()

  router.use(ApiDoc.routerEndpoint, ApiDoc.router)

}
