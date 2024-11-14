"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.missileData = exports.orgData = void 0;
const fs_1 = __importDefault(require("fs"));
const missile_1 = __importDefault(require("../models/missile"));
const organization_1 = __importDefault(require("../models/organization"));
exports.orgData = JSON.parse(fs_1.default.readFileSync('./public/organizations.json', 'utf8'));
exports.missileData = JSON.parse(fs_1.default.readFileSync('./public/missiles.json', 'utf8'));
async function loadInitialData() {
    if ((await organization_1.default.countDocuments()) === 0) {
        await organization_1.default.insertMany(exports.orgData);
    }
    if ((await missile_1.default.countDocuments()) === 0) {
        await missile_1.default.insertMany(exports.missileData);
    }
}
exports.default = loadInitialData;
