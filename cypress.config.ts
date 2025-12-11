// import { defineConfig } from "cypress";

// export default defineConfig({
//   e2e: {
//     baseUrl: "http://localhost:3000",
//     supportFile: "./support/e2e.ts",
//     specPattern: "./cypress/e2e/*.cy.ts",
//   },

//   component: {
//     devServer: {
//       framework: "react",
//       bundler: "webpack",
//     },
//   },
// });

import { defineConfig } from "cypress";
import webpackConfig from "./webpack.config";

export default defineConfig({
	component: {
		devServer: {
			framework: "react",
			bundler: "webpack",
			// optionally pass in webpack config
			webpackConfig,
			// or a function - the result is merged with any
			// webpack.config that is found
			//   webpackConfig: async () => {
			//     // ... do things ...
			//     const modifiedConfig = await injectCustomConfig(baseConfig);
			//     return modifiedConfig;
			//   },
		},
	},

	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},
});
