import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createData, getAllData } from "../utils/indexu";
// C-O-N-T-R-O-L-E-R FUNCTION//const path = require('path');
const saltRounds = 10;
//FUNCTION FOR GET ALL USERS COMING FROM THE getAllData Function IN UTILITY// GET REQUEST FOR WHEN USER LOGS IN
export const userLoginForm = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.render("login");
}
export const loginUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const allUsers = getAllData("users.json");
  const { password, Email } = req.body;
//   const existingUserName = allUsers.find((e: any) => e.UserName === UserName);
  const existingUserMail = allUsers.find((e: any) => e.Email === Email);
  if (!existingUserMail) {
    return res.send({
      message: "THIS USER DOSE NOT EXIST",
    });
  }
  allUsers.forEach((e: any) => {
    // console.log("EMAIL>>>", existingUserMail.email.trim)
    if (existingUserMail) {
        // bcrypt.compare(password, existingUserMail.password, function (err, result) {
      const result = bcrypt.compareSync(password, existingUserMail.password);
            if (result) {
            console.log("HELLO", result)
          // res.render("login");
            const token = jwt.sign(existingUserMail, "shhhhh");
          // res.set('token', token);
          // res.sendFile(path.join(__dirname, 'login'));
          const data = {
            "message": "login successful",
            "logedUser": existingUserMail,
            "Token": token,
          };
          res.redirect("/book/readAllBooks");

        } else {
          res.send({
            message: "THIS USER DOSE NOT EXIST",
          });
        }
      // });
    }
  });
};
//FUNCTION FOR CREATING users COMING FROM THE creatData Function IN UTILITY
export const createUserForm = (req: Request,
  res: Response,
  next: NextFunction
) => {
  res.render("signup");
}

export const createUserData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const allUsers = getAllData("users.json");
  const existingUserName = allUsers.find(
    (e: any) => e.UserName === req.body.UserName
  );
  const existingUserMail = allUsers.find(
    (e: any) => e.Email === req.body.Email
  );
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
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password,salt)
    const newChunk = {
      "id": uuidv4(),
      "UserName": UserName,
      "Email": email,
      "password": hash,
      "createdAt": new Date(),
      "updatedAt": new Date(),
    };
    const token = jwt.sign(newChunk, "shhhhh");
    allUsers.push(newChunk);
    createData("users.json", allUsers);
    const wittoken = {
      data: newChunk,
      token: token,
    };
    res.redirect("/book/readAllBooks");
  // });
};

