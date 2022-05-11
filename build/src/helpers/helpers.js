"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.select = void 0;
const select = (checkedEl, cases) => {
    return cases.find(caseItem => caseItem[0] === checkedEl)?.[1];
};
exports.select = select;
