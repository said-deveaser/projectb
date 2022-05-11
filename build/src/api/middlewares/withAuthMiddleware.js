"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAuthMiddleware = void 0;
const types_1 = require("../types");
const withAuthMiddleware = async (req, res, next) => {
    const isAuthed = true;
    if (!isAuthed) {
        res.status(types_1.StatusCode.Unauthorized);
        res.send(JSON.stringify({
            message: 'Нужно авторизоваться'
        }));
        return;
    }
    next();
};
exports.withAuthMiddleware = withAuthMiddleware;
