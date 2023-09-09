// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ZennCoin is ERC20 {
  string public name = "ZENC";
  string public symbol = "ZEC";
  constructor(uint256 initialSupply) public {
    _mint(msg.sender, initialSupply);
  }
}

// pragma solidity ^0.5.0;
// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
/*
*/
//Solidity 0.5
// contract TokenSample is ERC20 {
//   string public name = "My Token";
//   string public symbol = "MT";
//   uint public decimals = 18;
// constructor(uint256 initialSupply) public {
//     _mint(msg.sender, initialSupply);
//   }
// }
