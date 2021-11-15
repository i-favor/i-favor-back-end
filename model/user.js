const mongoose = require("./../mongodb/inedx");
const { Schema } = mongoose;
const UserSchema = new Schema({
  username: {
    type: String,
    maxLength: 20,
    minLength: 4,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.statics.findUser = async function (username) {
  return await this.findOne({ username });
};
UserSchema.statics.getPassword = async function (username) {
  return (await this.findOne({ username }))?.password;
};
const User = mongoose.model("user_info", UserSchema, "user");
module.exports = User;
