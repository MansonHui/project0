import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import { checkSchoolEmail } from "../helper/getSchoolNameAbbr";
export default class AuthController {
  constructor(private authService: AuthService) {}

  register = async (req: Request, res: Response) => {
    let existEmail = await this.authService.checkDuplicateEmail(req.body.email);

    if (existEmail) {
      res.status(400).json({ message: "Email already exists" });
      return;
    }

    let schoolAbbr = await checkSchoolEmail(req.body.email);

    if (!schoolAbbr) {
      let newParentdetail = await this.authService.createNewParent(
        req.body.username,
        req.body.email,
        req.body.password
      );

      console.log(newParentdetail);
      res.status(200).json({
        message: `new parent user account ${newParentdetail.username}`,
      });
      return;
    }

    if (schoolAbbr) {
      let existSchool = await this.authService.checkSchoolExist(schoolAbbr);
      console.log("existSchool", existSchool);
      if (existSchool) {
        let newAdminData = await this.authService.createNewAdmin(
          req.body.username,
          req.body.email,
          req.body.password
        );

        console.log(newAdminData);
        res.status(200).json({
          message: `new admins user account ${existSchool.full_name}`,
        });
      }
    }
  };
}
