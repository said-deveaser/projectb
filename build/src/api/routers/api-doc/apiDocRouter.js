"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiDoc = void 0;
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("../../../../build/swagger.json"));
var ApiDoc;
(function (ApiDoc) {
    ApiDoc.routerEndpoint = '/api-doc';
    ApiDoc.router = express_1.default.Router();
    ApiDoc.router.use((req, res, next) => {
        next();
    });
    ApiDoc.router.use('/', swagger_ui_express_1.default.serve);
    ApiDoc.router.get('/', swagger_ui_express_1.default.setup(swagger_json_1.default));
})(ApiDoc = exports.ApiDoc || (exports.ApiDoc = {}));
