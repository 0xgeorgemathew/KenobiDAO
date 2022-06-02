// Installation instructions: https://docs.ethers.io/v5/getting-started/#installing

async function main() {
  // eslint-disable-next-line global-require
  const { ethers } = require("ethers");
  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-mainnet.alchemyapi.io/v2/_R8mWgdnZwqjN2I_f_wi5GFDoc-KbI6t"
  );
  const blockNumber = await provider.getBlockNumber();
  console.log(blockNumber);
}
main();
