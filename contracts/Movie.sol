// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract MovieContract {
    struct Movie {
        address account;
        string title;
        string genre;
        string image;
        uint256 year;
        uint256 timestamp;
    }
    mapping(address => uint256) userMovieCount;
    uint256 totalMovieCount;
    Movie[] movies;

    constructor() {
        console.log("Welcome to Blockchainbuster. Send me a movie!");
    }

    function submitMovie(string memory _title) external {
        movies.push(Movie(msg.sender, _title, block.timestamp));
        userMovieCount[msg.sender] += 1;
        totalMovieCount += 1;
    }

    function getAllMovies() external view returns (Movie[] memory) {
        return movies;
    }

    function getUserMovieCount(address _account)
        external
        view
        returns (uint256)
    {
        return userMovieCount[_account];
    }

    function getTotalMovieCount() external view returns (uint256) {
        return totalMovieCount;
    }
}
