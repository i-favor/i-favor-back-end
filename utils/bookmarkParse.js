const { parseByString } = require("bookmark-file-parser");
const { attach } = require("./../utils");
module.exports = (str) => {
  let parsed = parseByString(str);
  attach(parsed);
  return parsed;
};
