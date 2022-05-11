import express from 'express'
import {PORT} from "./config/config";
import { ApiDoc } from './routers/api-doc/apiDocRouter';
import {Auth} from "./routers/auth/authRouter";
const app = express()

/*Logging request*/
app.use((req, res ,next) => {
  const now = new Date()
  console.log(`[${now.getDate()}.${now.getMonth()+1}.${now.getFullYear()}`
    +` ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}]`
    +` [${req.method.toUpperCase()}] ${req.hostname}..${req.path}`)
  next()
})

// Routers
app.use(Auth.routerEndpoint, Auth.router)
app.use(ApiDoc.routerEndpoint, ApiDoc.router)

app.listen(PORT, () => {
  console.log("server is run port " + PORT)
})
