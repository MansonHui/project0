import { Router } from "express";
import ParentTopUpController from "../controllers/ParentTopUpController";
import { knex } from "../utils/knex";
import ParentTopUpService from "../services/ParentTopUpService";
import { checkToken } from "../utils/guard";


export const parentTopUpRouter = Router();
const parentTopUpService = new ParentTopUpService(knex);
let parentTopUpController = new ParentTopUpController(parentTopUpService);


parentTopUpRouter.get("/getparentInfo",checkToken,parentTopUpController.getparentInfo);
parentTopUpRouter.put("/updateBalance", checkToken, parentTopUpController.updateBalance);

