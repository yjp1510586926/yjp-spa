const { resolve } = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const isDev = process.env.NODE_ENV !== "production";
const isProd = !isDev;

// 加载环境变量
const env = dotenv.config({
  path: resolve(__dirname, `.env.${process.env.NODE_ENV || "development"}`),
}).parsed || {};

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

// 环境特定配置
const envConfig = isProd
  ? require("./config/webpack.production.js")
  : require("./config/webpack.development.js");

module.exports = {
  mode: isProd ? "production" : "development",
  entry: "./src/index.tsx",
  
  output: {
    path: resolve(__dirname, "dist"),
    filename: isProd ? "js/[name].[contenthash:8].js" : "bundle.js",
    chunkFilename: isProd ? "js/[name].[contenthash:8].chunk.js" : "[name].chunk.js",
    assetModuleFilename: "assets/[name].[hash:8][ext]",
    clean: true,
    publicPath: "/",
  },

  module: {
    rules: [
      // TypeScript/JavaScript
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "swc-loader",
        },
      },
      
      // SCSS
      {
        test: /\.scss$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: true,
                localIdentName: "[name]__[local]--[hash:base64:5]",
              },
              importLoaders: 2,
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["autoprefixer", "postcss-preset-env"],
              },
            },
          },
          "sass-loader",
        ],
      },
      
      // CSS
      {
        test: /\.css$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "postcss-loader",
        ],
      },
      
      // 图片资源
      {
        test: /\.(png|jpe?g|gif|svg|webp|avif)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 10KB 以下转 base64
          },
        },
        generator: {
          filename: "images/[name].[hash:8][ext]",
        },
      },
      
      // 字体资源
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name].[hash:8][ext]",
        },
      },
      
      // 视频/音频
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/i,
        type: "asset/resource",
        generator: {
          filename: "media/[name].[hash:8][ext]",
        },
      },
      
      // SVG 组件化
      {
        test: /\.svg$/,
        issuer: /\.[jt]sx?$/,
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              typescript: true,
              ext: "tsx",
            },
          },
        ],
      },
    ],
  },

  resolve: {
    alias: {
      "@": resolve(__dirname, "src/"),
      "@components": resolve(__dirname, "src/components/"),
      "@hooks": resolve(__dirname, "src/hooks/"),
      "@utils": resolve(__dirname, "src/utils/"),
      "@types": resolve(__dirname, "src/types/"),
      "@store": resolve(__dirname, "src/store/"),
    },
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/[name].[contenthash:8].chunk.css",
    }),
    
    new webpack.DefinePlugin({
      ...envKeys,
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
    }),
    
    // 环境特定插件
    ...(envConfig.plugins || []),
  ],

  optimization: isProd
    ? {
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendors",
              priority: 10,
              reuseExistingChunk: true,
            },
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom|jotai)[\\/]/,
              name: "react-vendors",
              priority: 20,
            },
            common: {
              minChunks: 2,
              priority: 5,
              reuseExistingChunk: true,
            },
          },
        },
        runtimeChunk: {
          name: "runtime",
        },
        minimize: true,
        minimizer: [
          new TerserPlugin({
            parallel: true,
            terserOptions: {
              compress: {
                drop_console: true,
                drop_debugger: true,
              },
            },
          }),
          new CssMinimizerPlugin(),
        ],
        moduleIds: "deterministic",
        usedExports: true,
      }
    : {},

  devServer: envConfig.devServer,
  devtool: envConfig.devtool,
  cache: envConfig.cache,
  performance: envConfig.performance,
};
