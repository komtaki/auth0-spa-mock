import fs from "fs";
import jsonwebtoken from "jsonwebtoken";

const privateKey = fs.readFileSync("/app/config/private.key");

class JWT {
  static readonly KID = "xxxxx";

  static readonly alg = "RS256";

  static sign = (params: any) =>
    jsonwebtoken.sign(params, privateKey, {
      algorithm: JWT.alg,
      header: {
        alg: JWT.alg,
        typ: "JWT",
        kid: JWT.KID,
      },
    });
}

export default JWT;
