"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
var Parser;
(function (Parser) {
    Parser.makeUrlToParse = (params) => {
        const url = `https://krisha.kz/${params.purchaseType}/${params.propertyType}/`;
        return url;
    };
})(Parser = exports.Parser || (exports.Parser = {}));
