import express, { Request, Response } from "express";
import { authRouter } from "./router/authRouter";
import { homeRouter } from "./router/homeRouter";
import cors from "cors";



const PORT = 8080;
const app = express();

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/auth", authRouter);
app.use("/home", homeRouter);

//***************************************** */ testing
app.post("/", function (req: Request, res: Response) {
  // console.log(req.body);
  // res.json({ msg: "hello from frd server" });
});

app.listen(PORT, () => {
  console.log(`listening to http://localhost:${PORT}/`);
});
