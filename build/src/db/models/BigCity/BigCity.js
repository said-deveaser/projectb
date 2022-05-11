"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BigCity = void 0;
const getStaticData_1 = require("../../../parser/getStaticData");
exports.BigCity = {
    get: () => {
        return (0, getStaticData_1.getBigCitiesAsync)();
    }
};
