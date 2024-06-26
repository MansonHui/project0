import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import { getSchoolAbbr } from "../helper/getSchoolNameAbbr";
import { getUserName } from "../helper/getUserNameFromEmail";
import jwtSimple from "jwt-simple";
import dotenv from "dotenv";

dotenv.config();

export default class AuthController {
  constructor(private authService: AuthService) {}

  superAdmin = async (req: Request, res: Response) => {
    console.log("req.body", req.body);
    let emailListArray = req.body.emailList;

    // let emailArray = Object.keys(emailListObject).map(
    //   (key) => emailListObject[key]
    // );
    let response_array = [];
    for (let result of emailListArray) {
      console.log("email", result);
      let email = result;
      let username = await getUserName(email);
      let password = "1234567";

      let existEmail = await this.authService.checkDuplicateEmail(email);

      let schoolAbbr = await getSchoolAbbr(email);

      if (existEmail) {
        response_array.push({ msg: `${email} already exists` });
      }

      if (!existEmail) {
        if (schoolAbbr) {
          let getSchoolTable = await this.authService.getSchoolTable(
            schoolAbbr
          );

          if (getSchoolTable) {
            let newAdminData = await this.authService.createNewAdmin(
              username,
              email,
              password,
              getSchoolTable.id
            );

            response_array.push({
              msg: `new admins user account ${getSchoolTable.full_name} , ${newAdminData.email} , ${newAdminData.password}`,
            });
          } else {
            response_array.push({
              msg: `your school not yet subscript our service`,
            });
          }
        }
        if (!schoolAbbr) {
          let newParentdetail = await this.authService.createNewParent(
            username,
            email,
            password
          );

          console.log(newParentdetail);

          response_array.push({
            msg: `${newParentdetail.email} established`,
          });
        }
      }
    }

    res.status(200).json(response_array);
  };

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
    let { email, password } = req.body;

    let loginUserData = await this.authService.login(email, password);

    console.log("loginUserData", loginUserData);

    if (!loginUserData) {
      res.status(400).json({ msg: "wrong password/user" });
    } else {
      const payload = {
        userId: loginUserData.id,
        userRole: Object.keys(loginUserData)[0],
        email: loginUserData.email,
        userName: loginUserData.username,
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
