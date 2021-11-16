const Router = require("koa-router");
const router = new Router();
const { register, login, userInfo } = require("./../controller/user");
router.post("/login", login);
router.post("/register", register);
router.get("/info", userInfo);
module.exports = router;
