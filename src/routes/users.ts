import { Request, Response, NextFunction } from "express";
import express from 'express';
import { createUserData, createUserForm, loginUser, userLoginForm } from "../controlers/user";

const router = express.Router();
router.use(express.static("public"))
/* GET users listing. */
router.get("/login", userLoginForm)
router.post("/login", loginUser)


router.post("/createUser", createUserData)
router.get("/createUser", createUserForm)


export default router;