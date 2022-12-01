import { Request, Response } from "express";
import TokenCache from "../models/TokenCache";
import JWT from "../utils/jwt";

class OAuthTokenController {
  static post = (req: Request, res: Response) => {
    const cache = new TokenCache();
    const config = cache.get();

    if (!config) {
      return res.status(400).send();
    }

    const clientId = req.body.client_id;
    const date = new Date();
    const currentUnixTimeStamp = OAuthTokenController.getUnixTimeStamp(date);
    const expireUnixTimeStamp = OAuthTokenController.getExpiredUnixTimeStamp(date);

    res.json({
      access_token: JWT.sign({
        [`${process.env.AUTH0_ISSUER}email`]: process.env.USER_MAIL_ADDRESS,
        iss: process.env.AUTH0_ISSUER,
        sub: process.env.USER_SUID,
        aud: [config.audience, "xxx"],
        iat: currentUnixTimeStamp,
        exp: expireUnixTimeStamp,
        azp: clientId,
        scope: config.scope,
        permissions: [],
      }),
      expires_in: 86400,
      id_token: JWT.sign({
        nickname: "",
        name: process.env.USER_MAIL_ADDRESS,
        picture: "",
        updated_at: "2022-11-10T08:34:54.368Z",
        email: process.env.USER_MAIL_ADDRESS,
        email_verified: true,
        iss: process.env.AUTH0_ISSUER,
        sub: process.env.USER_SUID,
        aud: clientId,
        iat: currentUnixTimeStamp,
        exp: expireUnixTimeStamp,
        sid: "kMAsaoPtlnsevnTSfD87GT5x3B-wxIbl",
        nonce: config.nonce,
      }),
      scope: "openid profile email",
      token_type: "Bearer",
    });
  };

  private static getExpiredUnixTimeStamp = (date: Date) => {
    date.setDate(date.getDate() + 1);
    return OAuthTokenController.getUnixTimeStamp(date);
  };

  private static getUnixTimeStamp = (date: Date) => {
    return Math.floor(date.getTime() / 1000);
  };
}

export default OAuthTokenController;
