const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
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
