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
  favor: {
    required: false,
    type: Array,
    default: [],
  },
  todo: {
    required: false,
    type: Array,
    default: [],
  },
});

UserSchema.statics.findUser = async function (username) {
  return await this.findOne({ username });
};
UserSchema.statics.getPassword = async function (username) {
  return (await this.findOne({ username }))?.password;
};
UserSchema.statics.updateFavor = async function ({ _id, favor }) {
  let res = await this.updateOne({ _id }, { favor });
  console.log(res);
  return res;
};
UserSchema.statics.updateTodo = async function ({ _id, todo }) {
  return await this.updateOne({ _id }, { todo });
};
UserSchema.statics.queryFavor = async function (_id) {
  return (await this.findOne({ _id }))?.favor;
};
UserSchema.statics.queryTodo = async function (_id) {
  return (await this.findOne({ _id }))?.todo;
};
const User = mongoose.model("user_info", UserSchema, "user");
module.exports = User;
