import fs from "fs";
import JWT from "../src/utils/jwt";

const pubKeyText = fs
  .readFileSync("/app/config/public.crt", "utf8")
  .replace(/\r?\n/g, '')
  .replace('-----BEGIN CERTIFICATE-----', '')
  .replace('-----END CERTIFICATE-----', '');

const result = {
  keys: [
    {
      alg: JWT.alg,
      kty: "RSA",
      use: "sig",
      n: "vMPd9fkWPVbz-pc5YouWVleBRWdm-3fFYfFS3hjxRe6MSUfgPbGKk9fPJ2atJRGBDtXAmLiZ-bLbaXpkvECdO9Bdoj7bjPT_dgDybPxtctbtp9Z3MKQgVCC31RdWrfMEbKhWWqj-vKeXG8V2ve5ryrObGEPENwDmjIeBOzdSVkgla1U8iBjGBKuddwMAQhL83CCumKO-WijJJmHWGjVjaFasYUfRLVrPkcrigrwHVxJyk8zGRhyuBxUckq8CTqUOdbKoh_oaEnTgGaFQgK_h11RRqn96tPpi5BECqPAKl1umCIuSxf2pCoGW9m3bxNgD-Mak3P1Fjw4RS8cLgpgAqQ",
      e: "AQAB",
      kid: JWT.KID,
      x5t: JWT.KID,
      x5c: [pubKeyText],
    },
  ],
};

const dirPath = "/app/public/.well-known";

if(!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath,  { recursive: true })
}

fs.writeFileSync(`${dirPath}/jwks.json`, JSON.stringify(result));
