"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCityDistrictsAsync = exports.getBigCitiesAsync = void 0;
const axios_1 = __importDefault(require("axios"));
const node_html_parser_1 = require("node-html-parser");
const Logging_1 = __importDefault(require("../core/Logging/Logging"));
const getBigCitiesAsync = async () => {
    try {
        const urlToParseCities = 'https://krisha.kz/', optionsSelector = '.is-big-city';
        const htmlToParse = (await axios_1.default.get(urlToParseCities)).data;
        const document = (0, node_html_parser_1.parse)(htmlToParse);
        return document.querySelectorAll(optionsSelector).filter(el => {
            return el.getAttribute('data-type') === 'city';
        }).map((element) => {
            return {
                name: element.getAttribute('data-name') || '',
                alias: element.getAttribute('data-alias') || '',
                id: parseInt(element.getAttribute('data-id') ?? '0'),
            };
        });
    }
    catch (e) {
        Logging_1.default.error(`Failed in getCities (${__filename})`);
        console.error(e);
        throw e;
    }
};
exports.getBigCitiesAsync = getBigCitiesAsync;
const getCityDistrictsAsync = async (cityId) => {
    return (await (0, axios_1.default)(`https://krisha.kz/region/ajaxGetChildren/?id=${cityId}&add_all=1`, {
        headers: {
            'accept': 'application/json, text/javascript, */*; q=0.01',
            'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
            'cache-control': 'no-cache',
            'pragma': 'no-cache',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'x-requested-with': 'XMLHttpRequest'
        },
        // "referrer": "https://krisha.kz/",
        // "referrerPolicy": "strict-origin-when-cross-origin",
        // "body": null,
        method: 'GET',
        // "mode": "cors",
        // "credentials": "include"
    })).data;
};
exports.getCityDistrictsAsync = getCityDistrictsAsync;
