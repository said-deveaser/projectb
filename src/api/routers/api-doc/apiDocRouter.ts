import express from "express"
import swaggerUi from 'swagger-ui-express'
import swaggerJson from '../../../../swagger/output.json'

export namespace ApiDoc {
    export const routerEndpoint = '/api-doc'
    export const router = express.Router()
    console.log(swaggerJson)
    router.use('/', swaggerUi.serve)
    router.get('/', swaggerUi.setup(swaggerJson))
}