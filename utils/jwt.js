const jwt = require("jsonwebtoken");
const { privateKey: secret } = require("../config/config.secret");
module.exports = {
  getJWTPayload: (token) => token && jwt.verify(token.split(" ")[1], secret),
  generateJWT: (payload) =>
    jwt.sign(
      payload /*payload*/,
      secret /*secret*/,
      { expiresIn: "1h" } /*options*/
    ),
};
