const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  mode: "production",
  output: {
    filename: "js/[name].[contenthash:8].js",
    chunkFilename: "js/[name].[contenthash:8].chunk.js",
    assetModuleFilename: "assets/[name].[hash:8][ext]",
    clean: true, // Webpack 5 内置清理
    publicPath: "/",
  },
  plugins: [
    // Gzip 压缩
    new CompressionPlugin({
      algorithm: "gzip",
      test: /\.(js|css|html|svg)$/,
      threshold: 10240, // 只压缩大于 10KB 的文件
      minRatio: 0.8,
    }),
    // Brotli 压缩 (更高压缩率)
    new CompressionPlugin({
      algorithm: "brotliCompress",
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
      filename: "[path][base].br",
    }),
  ],
  // 生产环境 Source Map
  devtool: "source-map",
  // 性能优化
  performance: {
    hints: "warning",
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};
