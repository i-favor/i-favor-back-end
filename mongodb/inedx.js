const mongoose = require("mongoose");
const dbs = process.env.MONGODB_URI;
mongoose.connect(dbs).then(
  () => console.log("连接数据库成功: " + dbs),
  (failed) => console.log("连接数据库失败，原因：", failed)
);

const database = mongoose.connection;

database.on("error", function (error) {
  console.error("数据库错误，原因:" + error);
  mongoose.disconnect().then(() => "已经中止数据库的连接！");
});

database.on("close", function () {
  console.log("数据库断开，重新连接数据库");
  mongoose.connect(dbs).then(
    () => console.log("重新连接数据库成功: " + dbs),
    (failed) => console.log("重新连接数据库失败，原因：", failed)
  );
});

module.exports = mongoose;
