import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { getUserName } from "../helper/getUserNameFromEmail";

dotenv.config();

export async function isSuperAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if ("super" === (await getUserName(req.body.userRoleEmail))) {
      console.log("req.body", req.body);
      return next();
    }

    if ("super" !== (await getUserName(req.body.userRoleEmail))) {
      return res.status(400).json({ msg: "your are not super admin" });
    }
  } catch (e) {
    res.status(500).json({ msg: "server error" });
  }
}
