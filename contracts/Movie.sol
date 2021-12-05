// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract MovieContract {
    struct Movie {
        address account;
        string title;
    }
    mapping(address => uint256) movieCount;
    Movie[] internal movies;

    constructor() {
        console.log("Welcome to Blockchainbuster. Send me a movie!");
    }

    function submitMovie(string memory _title) external {
        movies.push(Movie(msg.sender, _title));
        movieCount[msg.sender] += 1;
    }

    function getMovies() external view returns (Movie[] memory) {
        return movies;
    }

    function getUserMovieCount(address _account)
        external
        view
        returns (uint256)
    {
        return movieCount[_account];
    }
}
