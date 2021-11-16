const User = require("./../model/user");
const {
  updateNone,
  querySuccess,
  updateSuccess,
} = require("./../constants/success.type");
const { typeError } = require("./../constants/err.type");
exports.query = async (ctx) => {
  const { _id } = ctx.state;
  const todo = await User.queryTodo(_id);
  ctx.body = { ...querySuccess, ...{ data: todo } };
};

exports.update = async (ctx) => {
  const { _id } = ctx.state;
  const { todo } = ctx.request.body;
  if (!Array.isArray(todo)) return ctx.app.emit("error", typeError, ctx);
  const { modifiedCount } = await User.updateTodo({ _id, todo });
  const realTodo = await User.queryTodo(_id);
  if (modifiedCount) {
    return (ctx.body = { ...updateSuccess, ...{ data: realTodo } });
  } else {
    return (ctx.body = { ...updateNone, ...{ data: realTodo } });
  }
};
