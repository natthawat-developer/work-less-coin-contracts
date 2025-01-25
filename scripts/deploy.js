async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
  
    const WorklessCoin = await ethers.getContractFactory("WorklessCoin");
    const worklessCoin = await WorklessCoin.deploy(ethers.utils.parseUnits("1000000", 18));
    console.log("WorklessCoin deployed to:", worklessCoin.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  