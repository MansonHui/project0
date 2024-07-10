import { Request, Response } from "express";
import ParentTopUpService from "../services/ParentTopUpService";
// import jwtSimple from "jwt-simple";
import dotenv from "dotenv";
// import { RequestSenderIdRequest } from "aws-sdk/clients/pinpointsmsvoicev2";

dotenv.config();

export default class ParentTopUpController {
  constructor(private parentTopUpService: ParentTopUpService) {}

  getparentInfo = async (req: Request, res: Response) => {
    let parentInfo = await this.parentTopUpService.getParentInfo(
      req.body.userRole,
      req.body.userRoleId
    );
    console.log("req.body.userRoleEmail", req.body.userRoleEmail);
    res.json(parentInfo);
  };

  updateBalance = async (req: Request, res: Response) => {
    console.log(req.body);
    const { userRole, userRoleId, add_on_value } = req.body;

    try {
      await this.parentTopUpService.updateBalance(
        userRole,
        parseInt(userRoleId),
        parseInt(add_on_value)
      );
      return res.status(200).json({ message: "Balance updated successfully" });
    } catch (error) {
      console.log(error);
      if (isNaN(add_on_value) || add_on_value <= 0) {
        return res.status(400).json({ error: "Invalid balance value" });
      } else {
        return res.status(500).json({ error: "Failed to update balance" });
      }
    }
  };
}

// //  getOwnParentProfile = async (req: Request, res: Response) =>{

// }
