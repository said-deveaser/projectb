"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./api/config/config");
const body_parser_1 = __importDefault(require("body-parser"));
const apiRouter_1 = require("./api/apiRouter");
const publicRouter_1 = require("./public/publicRouter");
const routes_1 = require("../build/routes");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
/*Logging request*/
app.use((req, res, next) => {
    const now = new Date();
    console.log(`[${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()}`
        + ` ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}]`
        + ` [${req.method.toUpperCase()}] ${req.hostname}..${req.path}`);
    next();
});
// Routers
app.use(publicRouter_1.Public.routerEndpoint, publicRouter_1.Public.router);
app.use(apiRouter_1.Api.apiRouterEndpoint, apiRouter_1.Api.apiRouter);
(0, routes_1.RegisterRoutes)(app);
app.listen(config_1.PORT, () => {
    console.log('server is run port ' + config_1.PORT);
});
