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
		const genre = ' Action';
		const year = '2008';
		const image = 'image';
		await movieContract.connect(owner).submitMovie(title, genre, image, year);
		const movies = await movieContract.getAllMovies();
		expect(movies.length).to.equal(1);
		expect(await movieContract.getUserMovieCount(owner.address)).to.equal(1);
		expect(await movieContract.getTotalMovieCount()).to.equal(1);
	});
	it('Should submit a movie with a random address', async function () {
		const title = 'Old Henry';
		const genre = ' Western';
		const year = '2021';
		const image = 'image';
		await movieContract.connect(randomPerson).submitMovie(title, genre, image, year);
		const movies = await movieContract.getAllMovies();
		expect(movies.length).to.equal(1);
		expect(await movieContract.getUserMovieCount(randomPerson.address)).to.equal(1);
		expect(await movieContract.getTotalMovieCount()).to.equal(1);
	});
});
