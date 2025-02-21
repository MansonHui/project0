import express from "express";
import { Request, Response } from "express";
import HomeSerive from "../services/HomeService";

export default class HomeController {
  router = express.Router();
  constructor(private homeService: HomeSerive) {
    // this.router.get("/getClassAllInfo", this.);
  }

  getAllClassInfo = async (req: Request, res: Response) => {
    try {
      let getAllClassInfo = await this.homeService.getALLClassInfo(
        req.body.userRole,
        req.body.userRoleId,
        req.body.school_id,
        req.body.userRoleName
      );

      console.log("hihih", getAllClassInfo);

      console.log("req.body.form ", req.body);
      res.status(200).json({ msg: "from all claass", getAllClassInfo });
    } catch (e) {
      console.error(e);
      res.status(400).json({
        msg: e,
      });
    }
  };
}
