const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("WorklessCoin", function () {
  let WorklessCoin;
  let worklessCoin;
  let deployer;
  let addr1;
  let addr2;

  beforeEach(async function () {
    // Get the accounts from Hardhat
    [deployer, addr1, addr2] = await ethers.getSigners();

    // Deploy the WorklessCoin contract with an initial supply of 1 million tokens (10^6 * 10^18)
    const initialSupply = ethers.utils.parseUnits("1000000", 18);
    WorklessCoin = await ethers.getContractFactory("WorklessCoin");
    worklessCoin = await WorklessCoin.deploy(initialSupply);

    await worklessCoin.deployed();
  });

  it("Should have correct name and symbol", async function () {
    expect(await worklessCoin.name()).to.equal("WorklessCoin");
    expect(await worklessCoin.symbol()).to.equal("WLCO");
  });

  it("Should assign the initial supply to the deployer's address", async function () {
    const deployerBalance = await worklessCoin.balanceOf(deployer.address);
    const initialSupply = await worklessCoin.totalSupply();
    expect(deployerBalance).to.equal(initialSupply);
  });

  it("Should transfer tokens between accounts", async function () {
    const amount = ethers.utils.parseUnits("100", 18);

    await worklessCoin.transfer(addr1.address, amount);

    const addr1Balance = await worklessCoin.balanceOf(addr1.address);
    expect(addr1Balance).to.equal(amount);

    await worklessCoin.connect(addr1).transfer(addr2.address, amount);

    const addr2Balance = await worklessCoin.balanceOf(addr2.address);
    expect(addr2Balance).to.equal(amount);
  });

  it("Should fail if sender doesn't have enough balance", async function () {
    const amount = ethers.utils.parseUnits("100", 18);
    await expect(
      worklessCoin.connect(addr1).transfer(deployer.address, amount)
    ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
  });

  it("Should approve and allow transfers from another account", async function () {
    const amount = ethers.utils.parseUnits("100", 18);

    await worklessCoin.approve(addr1.address, amount);

    const allowance = await worklessCoin.allowance(deployer.address, addr1.address);
    expect(allowance).to.equal(amount);

    await worklessCoin.connect(addr1).transferFrom(deployer.address, addr2.address, amount);

    const addr2Balance = await worklessCoin.balanceOf(addr2.address);
    expect(addr2Balance).to.equal(amount);
  });
});
