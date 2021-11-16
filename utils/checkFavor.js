const checkFavorValid = (array) => {
  if (!Array.isArray(array)) return false;
  if (!array.length) return true;
  return array.every((ele) => {
    if (typeof ele !== "object") return false;
    return (
      ele.name &&
      ((ele.type === "folder" && ele.children) ||
        (ele.type === "site" && ele.href))
    );
  });
};
module.exports = checkFavorValid;
