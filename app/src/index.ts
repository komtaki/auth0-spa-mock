import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import path from "path";
import AuthorizeController from "./controllers/AuthorizeController";
import OAuthTokenController from "./controllers/OAuthTokenController";
import * as OpenApiValidator from "express-openapi-validator";

const app = express();

app
  .options("*", cors())
  .use(morgan("combined"))
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(express.static("public"));

app.use(
  OpenApiValidator.middleware({
    apiSpec: "./openapi.yml",
    validateRequests: true,
    validateResponses: true,
  })
);

app.use((err: any, req: Request, res: Response, next: any) => {
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
  next()
});

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.post("/oauth/token", OAuthTokenController.post);

app.get("/authorize", AuthorizeController.get);

app.listen(80, () => {
  console.log("Auth0-Mock-Server listening on port 80!");
});
