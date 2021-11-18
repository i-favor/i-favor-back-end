const { nanoid } = require("nanoid");
const attach = (arr) => {
  arr.forEach((ele) => {
    if (!ele.nanoid) ele.nanoid = nanoid();
    attach(ele.children);
  });
  return arr;
};
exports.attach = attach;
