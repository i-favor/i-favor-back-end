const { createUser } = require("../service/user");
const { generateJWT } = require("../utils/jwt");
const { getJWTPayload } = require("../utils/jwt");
const { userNotHaveToken, fieldMissing } = require("../constant/err.type");

exports.login = async (ctx) => {
  const { username, password } = ctx.request.body;
  const userinfo = { username, password };
  if (!username || !password) {
    return ctx.app.emit("error", fieldMissing, ctx);
  }
  const token = generateJWT(userinfo);
  ctx.body = {
    code: "20001",
    message: "登录成功",
    data: token,
  };
};

exports.register = async (ctx) => {
  const { username, password } = ctx.request.body;
  if (!username || !password) {
    return ctx.app.emit("error", fieldMissing, ctx);
  }
  console.log("用户注册：", username, password);
  await createUser(username, password);
  ctx.body = "用户注册成功";
};

exports.userInfo = async (ctx) => {
  if (ctx.headers.authorization) {
    ctx.body = {
      code: "20002",
      message: "信息获取成功",
      data: getJWTPayload(ctx.headers.authorization),
    };
  }
  return ctx.app.emit("error", userNotHaveToken, ctx);
};
