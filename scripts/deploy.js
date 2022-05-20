const main = async () => {
	const [deployer] = await hre.ethers.getSigners();
	const accountBalance = await deployer.getBalance();

	console.log('Deploying contracts with account: ', deployer.address);
	console.log('Account balance: ', accountBalance.toString());

	const movieFactory = await hre.ethers.getContractFactory('MovieContract');
	const movieContract = await movieFactory.deploy();
	await movieContract.deployed();

	console.log('Movie address: ', movieContract.address);

	console.log('Verifying on etherscan...');
	if (network.name != 'hardhat') {
		await run('verify', {
			address: movieContract.address,
			constructorArgParams: [],
		});
		console.log('Verified :D');
	}
};

const runMain = async () => {
	try {
		await main();
		process.exit(0);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

runMain();
