const Router = require("koa-router");
const router = new Router();
const { upload, update, query } = require("./../controller/favor");
const queryUserId = require("./../middlewares/queryUserId");
router.post("/", queryUserId, upload);
router.put("/", queryUserId, update);
router.get("/", queryUserId, query);
module.exports = router;
