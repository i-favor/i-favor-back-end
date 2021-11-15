const { generateJWT } = require("../utils/jwt");
const { getJWTPayload } = require("../utils/jwt");
const { generateBcrypt, verify } = require("../utils/bcrypt");
const {
  userNotHaveToken,
  fieldMissing,
  duplicateUsername,
  registerFailed,
  userNotFound,
  wrongPassWord,
} = require("../error/err.type");
const User = require("../model/user");
exports.login = async (ctx) => {
  const { username, password } = ctx.request.body;
  if (!username || !password) {
    return ctx.app.emit("error", fieldMissing, ctx);
  }

  const userInfo = await User.findUser(username);
  if (userInfo === null) {
    return ctx.app.emit("error", userNotFound, ctx);
  }

  const verified = await verify(password, userInfo.password);

  if (verified) {
    return (ctx.body = {
      code: "20001",
      message: "登录成功",
      data: {
        username: userInfo.username,
        token: generateJWT({ username, password }),
      },
    });
  } else {
    return ctx.app.emit("error", wrongPassWord, ctx);
  }
};

exports.register = async (ctx) => {
  const { username, password } = ctx.request.body;

  if (!username || !password) {
    return ctx.app.emit("error", fieldMissing, ctx);
  }

  if ((await User.findUser(username)) !== null) {
    return ctx.app.emit("error", duplicateUsername, ctx);
  }

  const bcryptedPwd = await generateBcrypt(password);
  try {
    await new User({
      username,
      password: bcryptedPwd,
    })
      .save()
      .then((data) => {
        const { username, password } = data;
        ctx.body = {
          code: "20002",
          message: "注册成功",
          data: {
            username: username,
            token: generateJWT({ username, password }),
          },
        };
      })
      .catch(({ message }) => {
        ctx.app.emit("error", { ...registerFailed, ...{ message } }, ctx);
      });
  } catch (error) {
    ctx.app.emit("error", { ...registerFailed, ...{ message: error } }, ctx);
  }
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
