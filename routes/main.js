const Router = require("koa-router");
const router = new Router();
const userRoutes = require("./user").routes();
router.use("/user", userRoutes);
module.exports = router;
