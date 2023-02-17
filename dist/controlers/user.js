"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserData = exports.createUserForm = exports.loginUser = exports.userLoginForm = void 0;
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const indexu_1 = require("../utils/indexu");
// C-O-N-T-R-O-L-E-R FUNCTION//const path = require('path');
const saltRounds = 10;
//FUNCTION FOR GET ALL USERS COMING FROM THE getAllData Function IN UTILITY// GET REQUEST FOR WHEN USER LOGS IN
const userLoginForm = (req, res, next) => {
    res.render("login");
};
exports.userLoginForm = userLoginForm;
const loginUser = (req, res, next) => {
    const allUsers = (0, indexu_1.getAllData)("users.json");
    const { password, Email } = req.body;
    //   const existingUserName = allUsers.find((e: any) => e.UserName === UserName);
    const existingUserMail = allUsers.find((e) => e.Email === Email);
    if (!existingUserMail) {
        return res.send({
            message: "THIS USER DOSE NOT EXIST",
        });
    }
    allUsers.forEach((e) => {
        // console.log("EMAIL>>>", existingUserMail.email.trim)
        if (existingUserMail) {
            // bcrypt.compare(password, existingUserMail.password, function (err, result) {
            const result = bcrypt_1.default.compareSync(password, existingUserMail.password);
            if (result) {
                console.log("HELLO", result);
                // res.render("login");
                const token = jsonwebtoken_1.default.sign(existingUserMail, "shhhhh");
                // res.set('token', token);
                // res.sendFile(path.join(__dirname, 'login'));
                const data = {
                    "message": "login successful",
                    "logedUser": existingUserMail,
                    "Token": token,
                };
                res.redirect("/book/readAllBooks");
            }
            else {
                res.send({
                    message: "THIS USER DOSE NOT EXIST",
                });
            }
            // });
        }
    });
};
exports.loginUser = loginUser;
//FUNCTION FOR CREATING users COMING FROM THE creatData Function IN UTILITY
const createUserForm = (req, res, next) => {
    res.render("signup");
};
exports.createUserForm = createUserForm;
const createUserData = (req, res, next) => {
    const allUsers = (0, indexu_1.getAllData)("users.json");
    const existingUserName = allUsers.find((e) => e.UserName === req.body.UserName);
    const existingUserMail = allUsers.find((e) => e.Email === req.body.Email);
    if (existingUserName || existingUserMail) {
        return res.send({
            message: `User with the Name ${req.body.UserName}  And Email ${req.body.Email} already exists`,
        });
    }
    const { password, UserName, email } = req.body;
    // bcrypt.hash(password, saltRounds, (err, hash) => {
    //   if (err) {
    //     console.log(err);
    //     return err;
    //   }
    const salt = bcrypt_1.default.genSaltSync(saltRounds);
    const hash = bcrypt_1.default.hashSync(password, salt);
    const newChunk = {
        "id": (0, uuid_1.v4)(),
        "UserName": UserName,
        "Email": email,
        "password": hash,
        "createdAt": new Date(),
        "updatedAt": new Date(),
    };
    const token = jsonwebtoken_1.default.sign(newChunk, "shhhhh");
    allUsers.push(newChunk);
    (0, indexu_1.createData)("users.json", allUsers);
    const wittoken = {
        data: newChunk,
        token: token,
    };
    res.redirect("/book/readAllBooks");
    // });
};
exports.createUserData = createUserData;
//# sourceMappingURL=user.js.map