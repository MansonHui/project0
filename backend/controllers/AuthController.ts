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
      let newParent = await this.authService.createNewParent(
        req.body.username,
        req.body.email,
        req.body.password
      );
      console.log("newParent", newParent);
      return;
    }
  };
}
