const Router = require("koa-router");
const router = new Router();
const favor = require("./../controller/favor");
router.get("/", favor);
module.exports = router;
