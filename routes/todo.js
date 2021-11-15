const Router = require("koa-router");
const router = new Router();
const todo = require("./../controller/todo");
router.get("/", todo);
module.exports = router;
