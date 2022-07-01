// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers, network, run } from "hardhat";


async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log('Deploying contract...');
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed()
  console.log(`Deployed contract to : ${simpleStorage.address}`);


  if (network.config.chainId === 4/* rinkeby chainId */ && process.env.ETHERSCAN_API_KEY) {
    //  this is to wait for 6 blocks to confirm the transaction and then we can run verify
    // otherwise verify might fail as it might take split of second to reflect in ether scan
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, [])
  }

  const currentValue = await simpleStorage.retrieve();
  console.log(`Current value is : ${currentValue}`);

  // update current value
  const transactionResponse = await simpleStorage.store(7);
  await transactionResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log(`Updated value is : ${updatedValue}`);
}

async function verify(contractAddress: string, args: any[]) {
  console.log('Verifying contract...');
  try {
    // constructorArguments are the arguments of constructor of contract in this case SimpleStorage.sol
    await run('verify:verify', { address: contractAddress, constructorArguments: args })
  } catch (err: any) {
    if (err?.message?.toString().toLowerCase().includes('already verified')) {
      console.log('Already Verified');
    } else {
      console.error(err);
    }
  }

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
