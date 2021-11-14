const Router = require("koa-router");
const router = new Router();
const { register, login } = require("../controller/user");
router.post("/login", login);
router.post("/register", register);
module.exports = router;
