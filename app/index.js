const koa = require("koa");
const app = new koa();
const router = require("../routes/main");
const koaBody = require("koa-body");
const { loggerMiddleware } = require("../middlewares/log");
const errHandle = require("../utils/errorHandle");
const { privateKey: secret } = require("../config/config.secret");
const koaJwt = require("koa-jwt");

const jwtMiddleware = koaJwt({ secret }).unless({
  path: [/^\/user\/(login|register)$/],
});

app.on("error", errHandle);

app.use(loggerMiddleware);
app.use(
  koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 200 * 1024 * 1024,
    },
  })
);

app.use(router.allowedMethods());
app.use(jwtMiddleware);
app.use(router.routes());

app.use(async (ctx, next) => {
  const start = +new Date();
  await next();
  const end = +new Date();
  console.log(`请求${ctx.request.url}，请求完成时间：${end - start}ms`);
});

module.exports = app;
