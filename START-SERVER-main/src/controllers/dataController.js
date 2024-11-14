"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrg = exports.addNewUser = exports.logOut = exports.loginUser = exports.getAllItemInOrg = exports.getAllItemInStore = exports.getAllUsers = void 0;
const express_1 = __importDefault(require("express"));
const dataServices_1 = require("../services/dataServices");
const seed_1 = require("../helpers/seed");
const router = express_1.default.Router();
const getAllUsers = async (req, res) => {
    try {
        const users = await (0, dataServices_1.getAllUsersServices)();
        res.status(200).json(users);
    }
    catch (error) {
        console.error('cannot find users catch');
    }
};
exports.getAllUsers = getAllUsers;
const getAllItemInStore = async (req, res) => {
    try {
        const items = await seed_1.missileData;
        res.status(200).json(items);
    }
    catch (error) {
        console.error('cannot find users catch');
    }
};
exports.getAllItemInStore = getAllItemInStore;
const getAllItemInOrg = async (req, res) => {
    try {
        const items = await seed_1.orgData;
        res.status(200).json(items);
    }
    catch (error) {
        console.error('cannot find users catch');
    }
};
exports.getAllItemInOrg = getAllItemInOrg;
const loginUser = async (req, res) => {
    try {
        const user = req.body;
        const RealUser = await (0, dataServices_1.login)(user, res);
        res.json(RealUser);
    }
    catch (error) {
        console.error(error.message);
    }
};
exports.loginUser = loginUser;
const logOut = (req, res) => {
    try {
        (0, dataServices_1.logout)(res);
        res.status(200).json({ message: "Logged out successfully" });
    }
    catch (error) {
        console.error(error.message);
    }
};
exports.logOut = logOut;
const getDataById = (req, res) => {
    const id = req.params;
};
const addNewUser = async (req, res) => {
    try {
        const user = req.body;
        console.log(user);
        console.log(req.body);
        if (!user) {
            res.status(400).json({ error: "Check yourself" });
            return;
        }
        const newUser = await (0, dataServices_1.addUser)(user);
        console.log(newUser);
        res.status(201).json(newUser);
        return;
    }
    catch (error) {
        res.send("Create new user not success" + error);
        return;
    }
};
exports.addNewUser = addNewUser;
const updateOrg = async (req, res) => {
    try {
        const updatedOrg = req.body;
        if (!updatedOrg) {
            res.status(400).json({ error: "Check yourself" });
            return;
        }
        const Org = await (0, dataServices_1.updateOrganization)(updatedOrg, seed_1.orgData);
        res.status(201).json(Org);
        return;
    }
    catch (error) {
        res.send("Updated not success: " + error);
        return;
    }
};
exports.updateOrg = updateOrg;
