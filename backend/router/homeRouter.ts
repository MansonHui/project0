import { Router } from "express";
import { knex } from "../utils/knex";
import HomeController from "../controllers/homeController";
import HomeService from "../services/homeService";

export const homeRouter = Router();
const homeService = new HomeService(knex);
let homeController = new HomeController(homeService);





homeRouter.get("/getAllClassInfo",homeController.getAllClassInfo)