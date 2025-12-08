const merge = require("webpack-merge");

module.exports = {
  mode: "development",
  devServer: {
    port: 3000,
    open: true,
    hot: true,
  },
};
