const hre = require("hardhat");
const { ethers } = require("hardhat");

const fs = require("fs");
const uniswapSdk = require("@uniswap/v3-sdk");
const INonfungiblePositionManager = require("./abis/nfpm.json");

const routerAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564"; // all nets
const nonFungPosMngAddy = "0xC36442b4a4522E871399CD717aBDD847Ab11FE88"; // all nets
const wMaticAddress = "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889"; // testnet
// const wMaticAddress = '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270'; // mainnet

async function main() {
  const ethAmount = ethers.utils.parseEther("10"); // initial liquidity pool seed amount ETH
  const govTokenAmount = ethers.utils.parseEther("500000"); // initial liquidity pool amount govToken
  const stakingAmount = ethers.utils.parseEther("500000"); // initial distribution to staking contract
  const stakingTimeFrameBlocks = ethers.BigNumber.from("2102400"); // Roughly one year @ 15sec blocks
  const stakingContract = await hre.ethers.getContractFactory("Staking");
  const amtPerBlock = stakingAmount.div(stakingTimeFrameBlocks);
  const startBlock = await ethers.provider.getBlockNumber();
  const endBlock = stakingTimeFrameBlocks.add(startBlock);
  console.log({ ethAmount });
  console.log({ amtPerBlock });
  console.log({ startBlock });
  console.log({ endBlock });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
