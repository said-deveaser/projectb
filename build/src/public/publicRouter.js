"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Public = void 0;
const express_1 = __importDefault(require("express"));
const apiDocRouter_1 = require("../api/routers/api-doc/apiDocRouter");
var Public;
(function (Public) {
    Public.routerEndpoint = '/';
    Public.router = express_1.default.Router();
    Public.router.use(apiDocRouter_1.ApiDoc.routerEndpoint, apiDocRouter_1.ApiDoc.router);
})(Public = exports.Public || (exports.Public = {}));
