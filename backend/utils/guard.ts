import { NextFunction, Request, Response } from "express";
import { Bearer } from "permit";
import jwtSimple from "jwt-simple";
import dotenv from "dotenv";

dotenv.config();

const permit = new Bearer({
  query: "access_token",
});

export async function checkToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = permit.check(req);

    if (!token) {
      return res.status(401).json({ msg: "not log in" });
    }

    const decoded = jwtSimple.decode(token, process.env.JWT_SECRET!);

    req.body.userRoleId = decoded.userId;
    req.body.userRole = decoded.userRole;

    req.body.userRoleEmail = decoded.email;
    req.body.userRoleName = decoded.userName;

    req.body.school_id = decoded.school_id;

    return next();
  } catch (e) {
    res.status(500).json({ msg: "you are not logged in" });
  }
}
