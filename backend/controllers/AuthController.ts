import { Request, Response } from "express";
import AuthService from "../services/AuthService";

import { getUserName } from "../helper/getUserNameFromEmail";
import jwtSimple from "jwt-simple";
import dotenv from "dotenv";

dotenv.config();

export default class AuthController {
  constructor(private authService: AuthService) {}

  parentRegiser = async (req: Request, res: Response) => {
    let existEmail = await this.authService.checkDuplicateEmail(req.body.email);

    if (existEmail) {
      res.status(200).json({ msg: `${req.body.email} already exists` });
      return;
    }

    let newParentdetail = await this.authService.createNewParent(
      await getUserName(req.body.email),
      req.body.password,
      req.body.email
    );

    res.status(200).json({
      msg: `${newParentdetail.email} established`,
    });
  };

  login = async (req: Request, res: Response) => {
    let email = req.body.admin_email ? req.body.admin_email : req.body.email;
    let password = req.body.password;

    console.log(req.body);

    let loginUserData = await this.authService.login(email, password);

    console.log("loginUserData", loginUserData);

    if (!loginUserData) {
      res.status(400).json({ msg: "wrong password/user" });
    } else {
      const payload = {
        userId: loginUserData.id,
        userRole: Object.keys(loginUserData)[0],
        email: loginUserData.email
          ? loginUserData.email
          : loginUserData.admin_email,
        userName: loginUserData.username
          ? loginUserData.username
          : loginUserData.admin_name,
        school_id: loginUserData.school_id ? loginUserData.school_id : null,
      };

      console.log("payload", payload);

      const jwtToken = jwtSimple.encode(payload, process.env.JWT_SECRET!);

      res.status(200).json({
        msg: ` ${Object.keys(loginUserData)[0]},${email} :login success`,
        token: jwtToken,
      });
    }
  };
}
