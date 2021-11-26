const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('MovieContract', function () {
	let movieFactory, movieContract;
	let owner, randomPerson;
	beforeEach(async function () {
		[owner, randomPerson] = await hre.ethers.getSigners();
		movieFactory = await hre.ethers.getContractFactory('MovieContract');
		movieContract = await movieFactory.deploy();
		await movieContract.deployed();
	});
	it('Should submit a movie', async function () {
		await movieContract.submitMyMovie('Ip Man', 'Action');
		expect(await movieContract.getTotalMovies()).to.equal(1);
	});
	it('Should submit a movie with a random address', async function () {
		await movieContract
			.connect(randomPerson)
			.submitMyMovie('Old Henry', 'Western');
		expect(await movieContract.getTotalMovies()).to.equal(1);
	});
});
