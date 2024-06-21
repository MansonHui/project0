import express, { Request, Response } from "express";

const PORT = 8080;

const app = express();

app.get("/", function (requet: Request, res: Response) {
  res.json({ msg: "hello from frd" });
});

app.listen(PORT, () => {
  console.log(`listening to http://localhost:${PORT}/`);
});
