"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const DBConfig_1 = require("./DBConfig");
const Logging_1 = __importDefault(require("../core/Logging/Logging"));
var DBConnect;
(function (DBConnect) {
    let connect;
    const _connect = () => {
        try {
            connect = mongoose_1.default.createConnection(DBConfig_1.dbUri);
        }
        catch (e) {
            Logging_1.default.error("DB Connection Error: " + JSON.stringify(e));
            throw e;
        }
    };
    DBConnect.getConnectAsync = () => {
        if (!connect) {
            _connect();
        }
        return connect;
    };
})(DBConnect = exports.DBConnect || (exports.DBConnect = {}));
