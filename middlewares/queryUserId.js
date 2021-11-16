//该中间件用于确认用户身份，并将用户_id绑定到ctx上
const { getJWTPayload } = require("../utils/jwt");
module.exports = async (ctx, next) => {
  const { _id } = await getJWTPayload(ctx.headers.authorization);
  ctx.state._id = _id;
  await next();
};
