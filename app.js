const { APP_PORT } = require("./config/config.default");
const app = require("./app/index");
require("./model/user");
app.listen(APP_PORT, () => {
  console.log(`server is run at: http://localhost:${APP_PORT}`);
});
