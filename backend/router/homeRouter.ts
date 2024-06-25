import { Router } from "express";
import { knex } from "../utils/knex";
import HomeController from "../controllers/HomeController";
import HomeService from "../services/HomeService";

export const homeRouter = Router();
const homeService = new HomeService(knex);
let homeController = new HomeController(homeService);





homeRouter.get("/getAllClassInfo",homeController.getAllClassInfo)