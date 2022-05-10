import express from "express";

export namespace Auth {
  export const routerEndpoint = "/auth"
  export const router = express.Router()

  router.get("/token", (req,res) => {
    res.send("new_token")
  })
}


