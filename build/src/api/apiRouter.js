"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
const express_1 = __importDefault(require("express"));
const authRouter_1 = require("./routers/auth/authRouter");
// import {WaDictionaries} from './routers/wa-dictionaries/waDictionaries';
var Api;
(function (Api) {
    Api.apiRouterEndpoint = '/api';
    Api.apiRouter = express_1.default.Router();
    Api.apiRouter.use((req, res, next) => {
        res.set({ 'Content-Type': 'application/json; charset=utf-8' });
        next();
    });
    Api.apiRouter.use(authRouter_1.Auth.routerEndpoint, authRouter_1.Auth.router);
    // apiRouter.use(WaDictionaries.routerEndpoint, WaDictionaries.router)
})(Api = exports.Api || (exports.Api = {}));
