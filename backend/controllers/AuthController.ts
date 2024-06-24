import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import { checkSchoolEmail } from "../helper/getSchoolNameAbbr";
export default class AuthController {
  constructor(private authService: AuthService) {}

  register = async (req: Request, res: Response) => {
    let obj = req.body;
    let resultArray = Object.keys(obj).map((key) => obj[key]);
    let response_array = [{}];
    for (let result of resultArray) {
      console.log("email", result);

      let { username, email, password } = result;

      let existEmail = await this.authService.checkDuplicateEmail(email);

      let schoolAbbr = await checkSchoolEmail(email);

      if (existEmail) {
        response_array.push({ msg: `${email} already exists` });
      }

      if (!existEmail) {
        if (schoolAbbr) {
          let existSchool = await this.authService.checkSchoolExist(schoolAbbr);
          console.log("existSchool", existSchool);
          if (existSchool) {
            let newAdminData = await this.authService.createNewAdmin(
              username,
              email,
              password
            );

            console.log(newAdminData);

            response_array.push({
              msg: `new admins user account ${existSchool.full_name} , ${email} , ${password}`,
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
            msg: `${newParentdetail} pending  for register approval`,
          });
        }
      }
    }
    console.log("ggggggg");
    res.status(200).json(response_array);
  };
}
