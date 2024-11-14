"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dataController_1 = require("../controllers/dataController");
const jwt_1 = require("../helpers/jwt");
const router = express_1.default.Router();
router.get('/get', dataController_1.getAllUsers);
router.post('/register', dataController_1.addNewUser);
router.post('/login', dataController_1.loginUser);
router.get('/organization', dataController_1.getAllItemInOrg);
router.get('/store/:name', jwt_1.verifyUser, dataController_1.getAllItemInStore);
router.put('/update', dataController_1.updateOrg);
router.post('/logout', dataController_1.logOut);
exports.default = router;
