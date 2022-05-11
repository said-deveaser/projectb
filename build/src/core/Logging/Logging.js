"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error = (str) => {
    console.error(str);
};
const log = (str) => {
    console.log(str);
};
const Logging = {
    error,
    log
};
exports.default = Logging;
