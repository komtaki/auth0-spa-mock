import { Request, Response } from "express";
import TokenCache from "../models/TokenCache";

class AuthorizeController {
  static get = (req: Request, res: Response) => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 3);

    const cache = new TokenCache();

    cache.set({
      nonce: req.query["nonce"] as string,
      scope: req.query["scope"] as string,
      audience: req.query["audience"] as string || ''
    })

    const params = {
      code: "ZtVJQyXf9eOOQJi5h_xpY6CSgEcr092_3TTWT28zsy42z",
      state: req.query!["state"] as string,
    };

    switch (req.query["response_mode"]) {
      case "query":
        return AuthorizeController.createRedirectResponse(params, req, res);
      case "web_message":
        return AuthorizeController.createHTMLResponse(params, req, res);
      default:
        return res.status(400);
    }
  };

  private static createRedirectResponse = (
    params: { code: string; state: string },
    req: Request,
    res: Response
  ) => {
    const urlSearchParam = new URLSearchParams(params).toString();
    res.redirect(`${req.query!["redirect_uri"]}?${urlSearchParam.toString()}`);
  };

  private static createHTMLResponse = (
    params: { code: string; state: string },
    req: Request,
    res: Response
  ) => {
    const redirectUrl = new URL(req.query!["redirect_uri"] as string)
    const targetOrigin = redirectUrl.origin
    res.render('index', {...params, targetOrigin })
  };
}

export default AuthorizeController;
