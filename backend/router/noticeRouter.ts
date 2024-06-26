import { Router } from "express";
import { knex } from "../utils/knex";
import NoticeService from "../services/NoticeService";
import NoticeController from "../controllers/NoticeController";


export const noticeRouter = Router();
const noticeService = new NoticeService(knex);
let noticeController = new NoticeController(noticeService);





noticeRouter.get("/getAllNotice",noticeController.getAllNotices)