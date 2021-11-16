const fs = require("fs");
const User = require("./../model/user");
const bookMarkParse = require("../utils/bookmarkParse");
const {
  noFileAttached,
  fileParsedError,
  fieldMissing,
} = require("../constants/err.type");
const checkFavorValid = require("./../utils/checkFavor");
const {
  updateNone,
  updateSuccess,
  querySuccess,
} = require("./../constants/success.type");
exports.upload = async (ctx) => {
  const { _id } = ctx.state;

  if (!ctx.request.files.bookmarkHTML) {
    return ctx.app.emit("error", noFileAttached);
  }

  try {
    const bookmarkStr = fs
      .readFileSync(ctx.request.files.bookmarkHTML.path)
      .toString();
    const parsedBookmark = bookMarkParse(bookmarkStr);
    if (parsedBookmark.length) {
      const updateRes = await User.updateFavor({ _id, favor: parsedBookmark });
      const realBookmarkArray = await User.queryFavor(_id);
      if (updateRes.modifiedCount) {
        return (ctx.body = {
          ...updateSuccess,
          ...{
            message: "解析成功，数据已更新",
            data: realBookmarkArray,
          },
        });
      } else {
        const realBookmarkArray = await User.queryFavor(_id);

        return (ctx.body = {
          ...updateNone,
          ...{
            message: "解析成功，数据无变化",
            data: realBookmarkArray,
          },
        });
      }
    }

    return ctx.app.emit(
      "error",
      { ...fileParsedError, ...{ message: "标签为空/文件类型错误" } },
      ctx
    );
  } catch (error) {
    return ctx.app.emit(
      "error",
      { ...fileParsedError, ...{ message: error } },
      ctx
    );
  }
};

exports.update = async (ctx) => {
  const { _id } = ctx.state;
  const { bookmark } = ctx.request.body;

  if (!bookmark) return ctx.app.emit("error", fieldMissing, ctx);

  if (checkFavorValid(bookmark)) {
    const updateRes = await User.updateFavor({ _id, favor: bookmark });
    const realBookmark = await User.queryFavor(_id);
    if (updateRes.modifiedCount) {
      return (ctx.body = { ...updateSuccess, ...{ data: realBookmark } });
    } else {
      return (ctx.body = { ...updateNone, ...{ data: realBookmark } });
    }
  } else {
    return ctx.app.emit(
      "error",
      { ...fileParsedError, ...{ message: "收藏夹对象格式错误" } },
      ctx
    );
  }
};

exports.query = async (ctx) => {
  const { _id } = ctx.state;
  const realBookmark = await User.queryFavor(_id);
  ctx.body = {
    ...querySuccess,
    ...{
      data: realBookmark,
    },
  };
};
