const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('MovieContract', function () {
	let movieFactory, movieContract;
	let owner, randomPerson;
	beforeEach(async function () {
		movieFactory = await hre.ethers.getContractFactory('MovieContract');
		[owner, randomPerson] = await hre.ethers.getSigners();
		movieContract = await movieFactory.deploy();
		await movieContract.deployed();
	});
	it('Should submit a movie', async function () {
		const title = 'Ip Man';
		await movieContract.connect(owner).submitMovie(title);
		const movies = await movieContract.getMovies();
		expect(movies.length).to.equal(1);
		console.log(
			'0x8de806462823aD25056eE8104101F9367E208C14'.substr(0, 4) +
				'...' +
				'0x8de806462823aD25056eE8104101F9367E208C14'.substr(38)
		);
		expect(await movieContract.getUserMovieCount(owner.address)).to.equal(1);
	});
	it('Should submit a movie with a random address', async function () {
		const title = 'Old Henry';
		await movieContract.connect(randomPerson).submitMovie(title);
		const movies = await movieContract.getMovies();
		expect(movies.length).to.equal(1);
		expect(await movieContract.getUserMovieCount(randomPerson.address)).to.equal(1);
	});
});
