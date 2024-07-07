import express, { Request, Response } from "express";
import { authRouter } from "./router/authRouter";
import { superAdminRouter } from "./router/superAdminRouter";

import { homeRouter } from "./router/homeRouter";
import cors from "cors";
import { noticeRouter } from "./router/noticeRouter";

import { studentRouter } from "./router/studentRouter";
import { attendanceRouter } from "./router/attendanceRouter";
import { attendanceAndNoticeRouter } from "./router/attendanceAndNoticeRouter";
import { teacherNoticeRouter } from "./router/teacherNoticeRouter";
import { forTeacherGetAttendanceRouter } from "./router/forTeacherGetAttendanceRouter";



const PORT = 8080;
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/superAdmin", superAdminRouter);
app.use("/home", homeRouter);
app.use("/notice", noticeRouter);
app.use("/student", studentRouter);
app.use("/attendance", attendanceRouter);
app.use("/Message", attendanceAndNoticeRouter);
app.use("/images", express.static("uploads"));
app.use("/teacherNotice", teacherNoticeRouter);
app.use("/forTeacherGetAttendance", forTeacherGetAttendanceRouter)






//***************************************** */ testing
app.post("/", function (req: Request, res: Response) {});

app.listen(PORT, () => {
  console.log(`listening to http://localhost:${PORT}/`);
});
