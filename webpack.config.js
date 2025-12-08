const { merge } = require("webpack-merge");
const { resolve } = require("path");
const development = require("./config/webpack.development.js");
const production = require("./config/webpack.production.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const env = process.env.NODE_ENV;

module.exports = merge(
  {
    entry: "./src/index.tsx",
    output: {
      path: resolve(__dirname, "dist"),
      filename: "bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "swc-loader",
          },
        },
      ],
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "src/"),
      },
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"], // 告诉 Webpack 在解析模块时自动补全这些文件扩展名，这样在 import 语句中就不需要写完整的文件名了。
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
    ],
  },
  env === "production" ? production : development
);
