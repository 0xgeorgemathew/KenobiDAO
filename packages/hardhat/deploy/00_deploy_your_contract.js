// deploy/00_deploy_your_contract.js
const { ethers } = require("hardhat");

const fs = require("fs");
const uniswapSdk = require("@uniswap/v3-sdk");
const INonfungiblePositionManager = require("../abis/nfpm.json");

const routerAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564"; // all nets
const nonFungPosMngAddy = "0xC36442b4a4522E871399CD717aBDD847Ab11FE88"; // all nets
const wMaticAddress = "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889"; // testnet
// const wMaticAddress = '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270'; // mainnet

const ethAmount = ethers.utils.parseEther("10"); // initial liquidity pool seed amount ETH
const govTokenAmount = ethers.utils.parseEther("500000"); // initial liquidity pool amount govToken
const stakingAmount = ethers.utils.parseEther("500000"); // initial distribution to staking contract
const stakingTimeFrameBlocks = ethers.BigNumber.from("2102400"); // Roughly one year @ 15sec blocks

const localChainId = "31337";

// const sleep = (ms) =>
//   new Promise((r) =>
//     setTimeout(() => {
//       console.log(`waited for ${(ms / 1000).toFixed(3)} seconds`);
//       r();
//     }, ms)
//   );

module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  await deploy("YourContract", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    // args: [ "Hello", ethers.utils.parseEther("1.5") ],
    log: true,
    waitConfirmations: 5,
  });
  await deploy("Hitlist", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    args: [5],
    log: true,
    waitConfirmations: 5,
  });
  await deploy("GovToken", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    // args: [5],
    log: true,
    waitConfirmations: 5,
  });
  const govTokenContract = await ethers.getContractFactory("GovToken");
  console.log(`GovToken deployed to: ${govTokenContract.address}`);

  // Getting a previously deployed contract
  const YourContract = await ethers.getContract("YourContract", deployer);

  const hitlistContract = await ethers.getContract("Hitlist", deployer);

  console.log("Hitlist Contract Address:", YourContract.address);
  console.log("YourContract1 Contract Address:", hitlistContract.address);

  /*  await YourContract.setPurpose("Hello");
  
    To take ownership of yourContract using the ownable library uncomment next line and add the 
    address you want to be the owner. 
    // await yourContract.transferOwnership(YOUR_ADDRESS_HERE);

    //const yourContract = await ethers.getContractAt('YourContract', "0xaAC799eC2d00C013f1F11c37E654e59B0429DF6A") //<-- if you want to instantiate a version of a contract at a specific address!
  */

  /*
  //If you want to send value to an address from the deployer
  const deployerWallet = ethers.provider.getSigner()
  await deployerWallet.sendTransaction({
    to: "0x34aA3F359A9D614239015126635CE7732c18fDF3",
    value: ethers.utils.parseEther("0.001")
  })
  */

  /*
  //If you want to send some ETH to a contract on deploy (make your constructor payable!)
  const yourContract = await deploy("YourContract", [], {
  value: ethers.utils.parseEther("0.05")
  });
  */

  /*
  //If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
  const yourContract = await deploy("YourContract", [], {}, {
   LibraryName: **LibraryAddress**
  });
  */

  // Verify from the command line by running `yarn verify`

  // You can also Verify your contracts with Etherscan here...
  // You don't want to verify on localhost
  // try {
  //   if (chainId !== localChainId) {
  //     await run("verify:verify", {
  //       address: YourContract.address,
  //       contract: "contracts/YourContract.sol:YourContract",
  //       constructorArguments: [],
  //     });
  //   }
  // } catch (error) {
  //   console.error(error);
  // }
};
module.exports.tags = ["YourContract", "Hitlist"];
