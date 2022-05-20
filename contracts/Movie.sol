// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract MovieContract {
    struct Movie {
        address account;
        string title;
        string genre;
        string image;
        string year;
        uint256 timestamp;
    }
    mapping(address => uint256) userMovieCount;
    uint256 totalMovieCount;
    Movie[] movies;

    constructor() {
        console.log("Welcome to Blockchainbuster. Send me a movie!");
    }

    function submitMovie(
        string memory _title,
        string memory _genre,
        string memory _image,
        string memory _year
    ) external {
        movies.push(
            Movie(msg.sender, _title, _genre, _image, _year, block.timestamp)
        );
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
