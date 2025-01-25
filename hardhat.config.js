require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      chainId: 1337, // Local Hardhat network chain ID
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
  },
  ignition: {
    modules: "./ignition/modules",
  },
  namedAccounts: {
    deployer: {
      default: 0, 
    },
  },
};
