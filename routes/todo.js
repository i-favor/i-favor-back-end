const Router = require("koa-router");
const router = new Router();
const { query, update } = require("./../controller/todo");
const queryUserId = require("./../middlewares/queryUserId");
router.get("/", queryUserId, query);
router.put("/", queryUserId, update);
module.exports = router;
