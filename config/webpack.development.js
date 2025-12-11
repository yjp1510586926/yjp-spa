const { resolve } = require("path");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
	devServer: {
		port: 3000,
		open: true,
		hot: true,
		historyApiFallback: true, // SPA 路由支持
		compress: true,
		client: {
			overlay: {
				errors: true,
				warnings: false,
			},
			progress: true,
		},
		// API 代理配置示例
		proxy: [
			{
				context: ["/api"],
				target: "http://localhost:8080",
				changeOrigin: true,
				secure: false,
			},
		],
	},
	plugins: [
		// React Fast Refresh
		new ReactRefreshWebpackPlugin({
			overlay: false,
		}),
		// TypeScript 类型检查在独立进程中运行
		new ForkTsCheckerWebpackPlugin({
			async: true,
			typescript: {
				configFile: resolve(__dirname, "../tsconfig.json"),
				diagnosticOptions: {
					semantic: true,
					syntactic: true,
				},
			},
		}),
		// 打包分析工具 (可选,需要时启用)
		...(process.env.ANALYZE
			? [
					new BundleAnalyzerPlugin({
						analyzerMode: "server",
						openAnalyzer: true,
					}),
				]
			: []),
	],
	// 开发环境 Source Map
	devtool: "eval-cheap-module-source-map",
	// 缓存配置
	cache: {
		type: "filesystem",
		cacheDirectory: resolve(__dirname, "../node_modules/.cache/webpack"),
	},
};
