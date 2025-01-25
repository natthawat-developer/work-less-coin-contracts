async function main() {
    const [deployer] = await ethers.getSigners();
    const worklessCoinAddress = "DEPLOYED_CONTRACT_ADDRESS";  // Replace with actual address
    
    const WorklessCoin = await ethers.getContractAt("WorklessCoin", worklessCoinAddress);
    
    const balance = await WorklessCoin.balanceOf(deployer.address);
    console.log("Deployer's WorklessCoin balance:", ethers.utils.formatUnits(balance, 18));
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  