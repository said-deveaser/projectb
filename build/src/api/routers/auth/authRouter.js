"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const express_1 = __importDefault(require("express"));
var Auth;
(function (Auth) {
    Auth.routerEndpoint = '/auth';
    Auth.router = express_1.default.Router();
    Auth.router.get('/token', (req, res) => {
        // #swagger.description = 'Get all todos'
        /* #swagger.responses[200] = {
             description: 'Array of all todos',
             schema: { $ref: '#/definitions/Todos' }
         } */
        res.send('new_token');
    });
})(Auth = exports.Auth || (exports.Auth = {}));
