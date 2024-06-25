import express from "express"
import { Request, Response } from "express";
import HomeSerive from "../services/homeService";


export default class HomeController{
    router = express.Router();
    constructor(private homeService: HomeSerive){
        // this.router.get("/getClassAllInfo", this.getAllClassInfo);
    }

    getAllClassInfo = async (req: Request, res: Response) => {
        let getAllClassInfo = await this.homeService.getALLClassInfo();

        console.log("hihih",getAllClassInfo)
        res.status(200).json({ msg: "from all claass", getAllClassInfo})
    }


    
}