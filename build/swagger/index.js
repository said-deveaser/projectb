"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const swagger_autogen_1 = __importDefault(require("swagger-autogen"));
const doc_1 = require("./doc");
const endpointsFiles_1 = require("./endpointsFiles");
// путь и название генерируемого файла
const outputFile = (0, path_1.join)(__dirname, 'output.json');
(0, swagger_autogen_1.default)( /*options*/)(outputFile, endpointsFiles_1.endpointsFiles, doc_1.swaggerDoc).then(({ success }) => {
    console.log(`Generated: ${success}`);
});
