const Router = require("koa-router");
const router = new Router();
const userRoutes = require("./user").routes();
const todoRoutes = require("./todo").routes();
const favorRoutes = require("./favor").routes();
router.use("/user", userRoutes);
router.use("/todo", todoRoutes);
router.use("/favor", favorRoutes);
module.exports = router;
