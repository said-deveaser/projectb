import express from "express";

export namespace Auth {
  export const routerEndpoint = "/auth"
  export const router = express.Router()

  router.get("/token", (req,res) => {
 // #swagger.description = 'Get all todos'
 /* #swagger.responses[200] = {
     description: 'Array of all todos',
     schema: { $ref: '#/definitions/Todos' }
 } */

    res.send("new_token")
  })
}


