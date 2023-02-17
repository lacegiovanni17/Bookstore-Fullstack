"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controlers/user");
const router = express_1.default.Router();
router.use(express_1.default.static("public"));
/* GET users listing. */
router.get("/login", user_1.userLoginForm);
router.post("/login", user_1.loginUser);
router.post("/createUser", user_1.createUserData);
router.get("/createUser", user_1.createUserForm);
exports.default = router;
//# sourceMappingURL=users.js.map