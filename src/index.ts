import express from 'express'
import {PORT} from './api/config/config';
import bodyParser from 'body-parser';
import {Api} from './api/apiRouter';
import {Public} from './public/publicRouter';
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

/*Logging request*/
app.use((req, res ,next) => {
  const now = new Date()
  console.log(`[${now.getDate()}.${now.getMonth()+1}.${now.getFullYear()}`
    +` ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}]`
    +` [${req.method.toUpperCase()}] ${req.hostname}..${req.path}`)
  next()
})

// Routers
app.use(Public.routerEndpoint, Public.router)
app.use(Api.apiRouterEndpoint, Api.apiRouter)

app.listen(PORT, () => {
  console.log('server is run port ' + PORT)
})
