import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import { sendEmail } from "./services/email";
import express, { Request, Response } from "express";

const app = express();

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

app.listen(5000, () => {
  console.info("Server listening...");
});

app.get("/home", (_, res: Response) =>
  res.render("pages/index", { email: "" })
);

app.get("/confirmation", (_, res: Response) =>
  res.render("pages/confirmation")
);

app.post("/choose", (req: Request, res: Response) =>
  res.render("pages/choose", { email: req.body.email, option: 0 })
);

app.post("/sendEmail", (req: Request, res: Response) => {
  const { option, email } = req.body;

  return sendEmail(option)(email)
    .then((_) => {
      res.status(200);
      return res.json({});
    })
    .catch((_) => {
      res.status(400);
      return res.json({});
    });
});

app.get("*", (_, res: Response) => {
  res.render("pages/index", { email: "" });
});
