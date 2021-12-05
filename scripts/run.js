const main = async () => {
	const [owner, randomPerson] = await hre.ethers.getSigners();
	const movieFactory = await hre.ethers.getContractFactory('MovieContract');
	const movieContract = await movieFactory.deploy();
	await movieContract.deployed();

	console.log('Contract deployed to:', movieContract.address);
	console.log('Contract deployed by:', owner.address);
};

const runMain = async () => {
	try {
		await main();
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

runMain();
