module.exports = (ctx) => {
  ctx.body = [
    { description: "eat", priority: 0, fulfilled: true },
    {
      description: "sleep",
      priority: 1,
      fulfilled: false,
    },
  ];
};
