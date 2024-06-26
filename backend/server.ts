import express, { Request, Response } from "express";
import {authRouter} from "./router/authRouter"

import { homeRouter } from "./router/homeRouter";
import cors from "cors";
import { noticeRouter } from "./router/noticeRouter";


import { studentRouter } from "./router/studentRouter";
import { attendanceRouter } from "./router/attendanceRouter";

const PORT = 8080;
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/home", homeRouter);
app.use("/notice",noticeRouter)
app.use("/student", studentRouter);
app.use("/attendance",attendanceRouter);

//***************************************** */ testing
app.post("/", function (req: Request, res: Response) {
  // console.log(req.body);
  // res.json({ msg: req.body });
});

app.listen(PORT, () => {
  console.log(`listening to http://localhost:${PORT}/`);
});
