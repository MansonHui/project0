import express from "express"
import { Request, Response } from "express";
import HomeSerive from "../services/HomeService";


export default class HomeController{
    router = express.Router();
    constructor(private homeService: HomeSerive){
        // this.router.get("/getClassAllInfo", this.);
    }

    getAllClassInfo = async (req: Request, res: Response) => {
        let getAllClassInfo = await this.homeService.getALLClassInfo(
            req.body.userRole,
            req.body.userRoleId
        );

        console.log("hihih",getAllClassInfo)
        res.status(200).json({ msg: "from all claass", getAllClassInfo})
    }


    
}