import express from "express";
import { Request, Response } from "express";
import TeacherNoticeService from "../services/TeacherNoticeService";

export default class TeacherNoticeController {
  router = express.Router();
  constructor(private teacherNoticeService: TeacherNoticeService) {}

  getTeacherNotices = async (req: Request, res: Response) => {
    console.log("check req body", req.body);
    let getTeacherNotice = await this.teacherNoticeService.getTeacherNotice(
      req.body.userRole,
      req.body.userRoleId
    );

    res.status(200).json({ msg: "from teacher Notices", getTeacherNotice });
  };

  getTeacherNoticeDetails = async (req: Request, res: Response) => {
    console.log("check req body", req.body);

    let getTeacherNoticeDetail =
      await this.teacherNoticeService.getTeacherNoticeDetail(
        req.body.userRole,
        req.body.userRoleId,
        parseInt(req.query.noticeId! as string),
        req.body.school_id,
      );

    console.log("check getTeacherDetail", getTeacherNoticeDetail);

    res.status(200).json({
      msg: "from teacher Notices",
      getTeacherNoticeDetail: getTeacherNoticeDetail,
    });
  };

  // getNoticeByNoticeID = async (req: Request, res: Response) => {
  //   console.log("check req body from getNoticeByNoticeID", req.body);

  //   let getNoticeByNoticeID =
  //     await this.teacherNoticeService.getNoticeByNoticeID(
  //       req.body.userRoleId,
  //       req.body.school_id

  //       // req.body.userRole,
  //     );

  //   res.status(200).json({ msg: "from teacher Notices", getNoticeByNoticeID });
  // };
}
