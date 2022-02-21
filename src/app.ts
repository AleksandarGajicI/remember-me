import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import { sendEmail } from "./services/email";
import express, { Request, Response } from "express";

const app = express();

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

app.listen(port, () => {
  console.info("Server listening...");
});

app.get("/home", (_, res: Response) =>
  res.render("pages/index", { email: "" })
);

app.get("/confirmation", (_, res: Response) =>
  res.render("pages/confirmation")
);

app.post("/choose", (req: Request, res: Response) =>
  res.render("pages/choose", {
    option: 0,
    email: req.body.email,
    host: `${process.env.REMEMBER_ME_HOST}:${port}`,
  })
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
