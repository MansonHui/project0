import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import { getSchoolAbbr } from "../helper/getSchoolNameAbbr";
import { getUserName } from "../helper/getUserNameFromEmail";
// import jwtSimple from "jwt-simple";

export default class AuthController {
  constructor(private authService: AuthService) {}

  register = async (req: Request, res: Response) => {
    let emailListObject = req.body;

    // let emailArray = Object.keys(emailListObject).map(
    //   (key) => emailListObject[key]
    // );
    let response_array = [];
    for (let result of emailListObject.email) {
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
            msg: `${newParentdetail.email} pending  for admin approval`,
          });
        }
      }
    }

    res.status(200).json(response_array);
  };

  login = async (req: Request, res: Response) => {
    let { email, password } = req.body;

    let isExist = await this.authService.login(email, password);

    console.log("usertype", Object.keys(isExist));

    // const jwtToken= jwtSimple.encode([payload])

    if (!isExist) {
      res.status(400).json({ msg: "wrong password/user" });
    } else {
      res.status(200).json({
        msg: ` ${Object.keys(isExist)},${email} :login success`,
      });
    }
  };
}
