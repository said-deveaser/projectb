"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrongParamsOrUrl = void 0;
const types_1 = require("../types");
const wrongParamsOrUrl = (res) => {
    res.status(types_1.StatusCode.Forbidden);
    res.send(JSON.stringify({
        message: 'Неверные параметры запроса или элементы URL'
    }));
};
exports.wrongParamsOrUrl = wrongParamsOrUrl;
