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
      return res.status(400).json({ msg: "not log in" });
    }

    const decoded = jwtSimple.decode(token, process.env.JWT_SECRET!);

    req.body.userId = decoded.userId;
    req.body.userRole = decoded.userRole;

    req.body.email = decoded.email;
    req.body.userName = decoded.userName;

    return next();
  } catch (e) {
    res.status(500).json({ msg: "server error" });
  }
}
