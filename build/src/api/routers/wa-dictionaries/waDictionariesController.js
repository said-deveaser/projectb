"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaDictionariesController = void 0;
const getStaticData_1 = require("../../../parser/getStaticData");
const tsoa_1 = require("tsoa");
const BigCity_1 = require("../../../db/models/BigCity/BigCity");
let WaDictionariesController = class WaDictionariesController extends tsoa_1.Controller {
    async getBigCities() {
        try {
            return BigCity_1.BigCity.get();
        }
        catch (e) {
            this.setStatus(500);
            console.error('Caught error', e);
            throw e;
        }
    }
    async getCityDistricts(cityid) {
        return (0, getStaticData_1.getCityDistrictsAsync)(parseInt(cityid));
    }
};
__decorate([
    (0, tsoa_1.Get)('/big-cities')
], WaDictionariesController.prototype, "getBigCities", null);
__decorate([
    (0, tsoa_1.Get)('/city-districts/{cityid}')
], WaDictionariesController.prototype, "getCityDistricts", null);
WaDictionariesController = __decorate([
    (0, tsoa_1.Route)('/api/wa-dictionaries')
], WaDictionariesController);
exports.WaDictionariesController = WaDictionariesController;
