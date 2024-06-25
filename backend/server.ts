import express, { Request, Response } from "express";
import { authRouter } from "./router/useAuth";
import { homeRouter } from "./router/homeRouter";
import cors from "cors";
import { studentRouter } from "./router/studentRouter";

const PORT = 8080;
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/home", homeRouter);
app.use("/student", studentRouter);

//***************************************** */ testing
app.post("/", function (req: Request, res: Response) {
  // console.log(req.body);
  // res.json({ msg: req.body });
});

app.listen(PORT, () => {
  console.log(`listening to http://localhost:${PORT}/`);
});
