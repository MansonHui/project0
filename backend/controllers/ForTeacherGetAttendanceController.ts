import express from "express";
import { Request, Response } from "express";
import ForTeacherGetAttendanceService from "../services/ForTeacherGetAttendanceService";

export default class ForTeacherGetAttendanceController {
  router = express.Router();
  constructor(
    private forTeacherGetAttendanceService: ForTeacherGetAttendanceService
  ) {}

  getForTeacherGetAttendances = async (req: Request, res: Response) => {
    try {
      let getForTeacherGetAttendance =
        await this.forTeacherGetAttendanceService.getForTeacherGetAttendance(
          req.body.userRole,
          req.body.userRoleId,
          req.body.userRoleName
        );

      console.log("getForTeacherGetAttendance", getForTeacherGetAttendance);

      res.status(200).json({
        msg: "from Get About Teacher student attendance",
        getForTeacherGetAttendance,
      });
    } catch (e) {
      console.error(e);
      res.status(400).json({
        msg: e,
      });
    }
  };
}
