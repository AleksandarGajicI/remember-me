import express, { Request, Response } from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

app.listen(5000, () => {
  console.info("Server listening...");
});

app.get("/home", (_, res: Response) =>
  res.render("pages/index", { email: "" })
);

app.post("/choose", (req: Request, res: Response) =>
  res.render("pages/choose", { email: req.body.email, option: 0 })
);

app.post("/sendEmail", (req: Request, res: Response) => {
  //send actual email
  console.log("hello");
  res.render("pages/confirmation", {
    option: req.body.option,
    email: req.body.email,
  });
});

app.get("*", (_, res: Response) => {
  res.render("pages/index", { email: "" });
});
