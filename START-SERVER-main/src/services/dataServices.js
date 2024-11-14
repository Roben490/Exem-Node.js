"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.updateOrganization = exports.addUser = exports.getAllUsersServices = void 0;
const bcrypt_1 = require("../helpers/bcrypt");
const jwt_1 = require("../helpers/jwt");
const User_1 = __importDefault(require("../models/User"));
const organization_1 = __importDefault(require("../models/organization"));
const getAllUsersServices = async () => {
    const data = await User_1.default.find();
    return data;
};
exports.getAllUsersServices = getAllUsersServices;
const addUser = async (user) => {
    try {
        const newUser = new User_1.default(user);
        newUser.password = (0, bcrypt_1.generateUserPassword)(newUser.password);
        await newUser.save();
        return newUser;
    }
    catch (error) {
        throw new Error("Failed to add new user");
    }
};
exports.addUser = addUser;
const updateOrganization = async (updatedOrg, orgData) => {
    try {
        const pastOrg = organization_1.default.findOne({ name: updatedOrg.name });
        await pastOrg.updateOne({ updatedOrg });
        return updatedOrg;
    }
    catch (error) {
        throw new Error("Failed to update Org");
    }
};
exports.updateOrganization = updateOrganization;
const cookieConfig = {
    httpOnly: true, // הגנה מפני XSS - הקוקי לא נגיש דרך JavaScript בצד הלקוח
    secure: true, // שליחת הקוקי רק בחיבור HTTPS
    sameSite: 'strict', // הגנה מפני CSRF
    maxAge: 24 * 60 * 60 * 1000 // תוקף של יום אחד (במילישניות)
};
const login = async (user, res) => {
    try {
        const foundUser = await User_1.default.findOne({ username: user.username });
        if (!foundUser)
            return console.log("User not found");
        const isPasswordCorrect = await (0, bcrypt_1.comparePassword)(user.password, foundUser.password);
        if (!isPasswordCorrect)
            return console.log("Incorrect password or Email");
        const { _id, organization } = foundUser;
        const token = (0, jwt_1.generateAuthToken)(_id);
        res.cookie('token', token, cookieConfig);
        return { foundUser, token };
    }
    catch (error) {
        throw new Error("Failed to login");
    }
};
exports.login = login;
const logout = (res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.logout = logout;
