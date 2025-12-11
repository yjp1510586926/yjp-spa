/** @type import('hardhat/config').HardhatUserConfig */
// import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const PRIVATE_KEY =
	process.env.PRIVATE_KEY ||
	"0x0000000000000000000000000000000000000000000000000000000000000000";
const INFURA_API_KEY = process.env.INFURA_API_KEY || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";

export default {
	solidity: {
		version: "0.8.28",
		settings: {
			optimizer: {
				enabled: true,
				runs: 200,
			},
		},
	},
	paths: {
		sources: "./contracts",
		tests: "./test",
		cache: "./cache",
		artifacts: "./artifacts",
	},
	networks: {
		hardhat: {
			type: "edr-simulated" as const,
			chainId: 1337,
			// forking: {
			//   url: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
			// }
		},
		localhost: {
			type: "http" as const,
			url: "http://127.0.0.1:8545",
			chainId: 1337,
		},
		sepolia: {
			type: "http" as const,
			url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
			accounts:
				PRIVATE_KEY !==
				"0x0000000000000000000000000000000000000000000000000000000000000000"
					? [PRIVATE_KEY]
					: [],
			chainId: 11155111,
		},
		mainnet: {
			type: "http" as const,
			url: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
			accounts:
				PRIVATE_KEY !==
				"0x0000000000000000000000000000000000000000000000000000000000000000"
					? [PRIVATE_KEY]
					: [],
			chainId: 1,
		},
	},
	etherscan: {
		apiKey: ETHERSCAN_API_KEY,
	},
	gasReporter: {
		enabled: process.env.REPORT_GAS === "true",
		currency: "USD",
		coinmarketcap: process.env.COINMARKETCAP_API_KEY,
	},
};
