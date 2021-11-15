const bcrypt = require("bcrypt");
module.exports = {
  async generateBcrypt(password) {
    let salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  },
  async verify(plainpwd, encryptedpwd) {
    return await bcrypt.compare(plainpwd, encryptedpwd);
  },
};
