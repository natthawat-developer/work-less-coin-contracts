const { ethers } = require("hardhat");

module.exports = async ({ deployments, getNamedAccounts }) => {
  const { deployer } = await getNamedAccounts();
  console.log("Deploying WorklessCoin with the account:", deployer);

  const WorklessCoin = await deployments.deploy("WorklessCoin", {
    from: deployer,
    args: [ethers.utils.parseUnits("1000000", 18)], // 1 million tokens
    log: true,
  });

  console.log("WorklessCoin contract deployed to:", WorklessCoin.address);
};

module.exports.tags = ["WorklessCoin"];
