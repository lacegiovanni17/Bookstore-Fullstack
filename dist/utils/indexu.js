"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createData = exports.getAllData = void 0;
const fs_1 = __importDefault(require("fs"));
const getAllData = (path) => {
    const result = fs_1.default.readFileSync(path, "utf-8");
    return JSON.parse(result);
};
exports.getAllData = getAllData;
const createData = (path, data) => {
    const stringData = JSON.stringify(data, null, 2);
    const result = fs_1.default.writeFileSync(path, stringData);
};
exports.createData = createData;
//# sourceMappingURL=indexu.js.map