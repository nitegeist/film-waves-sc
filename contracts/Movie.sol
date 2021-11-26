// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract MovieContract {
    struct Movie {
        address user;
        string title;
        string genre;
    }
    mapping(address => Movie) movies;
    uint256 public totalMovies;
    address[] public userAddreses;

    constructor() {
        console.log("Welcome to Blockchainbuster. Send me a movie!");
    }

    function submitMyMovie(string memory _title, string memory _genre) public {
        totalMovies += 1;
        movies[msg.sender] = Movie(msg.sender, _title, _genre);
        userAddreses.push(msg.sender);
        console.log(
            "%s has submitted %s from the %s genre!",
            msg.sender,
            _title,
            _genre
        );
    }

    function getMovie(address _userAddress)
        public
        view
        returns (
            address,
            string memory,
            string memory
        )
    {
        Movie storage movie = movies[_userAddress];
        return (movie.user, movie.title, movie.genre);
    }

    function getTotalMovies() public view returns (uint256) {
        return totalMovies;
    }
}
