require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-etherscan');
require('dotenv').config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
const { ALCHEMY_API_URL, ETHERSCAN_API_KEY, PRIVATE_RINKEBY_KEY } = process.env;

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
	const accounts = await hre.ethers.getSigners();

	for (const account of accounts) {
		console.log(account.address);
	}
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
	defaultNetwork: 'hardhat',
	networks: {
		hardhat: {
			chainId: 1337,
		},
		rinkeby: {
			url: ALCHEMY_API_URL,
			accounts: [PRIVATE_RINKEBY_KEY],
		},
	},
	solidity: {
		version: '0.8.9',
		settings: {
			optimizer: {
				enabled: true,
				runs: 200,
			},
		},
	},
	etherscan: {
		apiKey: `${ETHERSCAN_API_KEY}`,
	},
};
