"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endpointsFiles = void 0;
const path_1 = require("path");
// массив путей к роутерам
exports.endpointsFiles = [
    (0, path_1.join)(__dirname, '../src/api/routers/auth/authRouter.ts'),
    (0, path_1.join)(__dirname, '../src/api/routers/wa-dictionaries/waDictionariesController.ts'),
];
