module.exports = function (err, ctx) {
  let status = 500;
  console.log(err.code);
  switch (err.code) {
    case "10001":
      status = 400;
      break;
    case "10002":
      status = 401;
      break;
    case "10003":
      status = 404;
      break;
    case "10004":
    case "10005":
    case "10007":
    case "10008":
      status = 403;
      break;
    case "10006":
      status = 500;
      break;
  }
  console.log(status);
  ctx.status = status;
  ctx.body = err;
};
