"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const router_1 = __importDefault(require("./routers/router"));
const DB_1 = require("./DB/DB");
const seed_1 = __importDefault(require("./helpers/seed"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true
}));
(0, DB_1.connectToMongo)();
(0, seed_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(router_1.default);
app.listen(process.env.PORT || 8000, () => {
    console.log(`listening on Port ${process.env.PORT || 8000}`);
});
