// import * as dotenv from "dotenv";
const dotenv = require('dotenv');
import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle"; // testing framework
import "@nomiclabs/hardhat-ethers";
import "@typechain/hardhat"; // this is to get types from contract to the codebase refer to auto generated "typechain-types" directory
import "hardhat-gas-reporter"; // estimates and gives report on how much GAS is required for each function in contract    
import "solidity-coverage"; // generates the test coverage of the code
import "./tasks/block-number";
const { parsed, error } = dotenv.config({ path: './.env.example' });
console.error(error);


// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL_TEST_NET || "";
const RINKEBY_PRIVATE_KEY_TEST_NET = process.env.RINKEBY_PRIVATE_KEY_TEST_NET !== undefined ? [process.env.RINKEBY_PRIVATE_KEY_TEST_NET] : []
const ETHER_SCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const COIN_MARKET_CAP_API_KEY = process.env.COIN_MARKET_CAP_API_KEY;
const config: HardhatUserConfig = {
  solidity: "0.8.8",
  defaultNetwork: "hardhat",
  networks: {
    // ropsten: {
    //   url: process.env.ROPSTEN_URL || "",
    //   accounts:
    //     process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    // },
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts: RINKEBY_PRIVATE_KEY_TEST_NET,
      chainId: 4
    },
    localhost: {
      url: 'http://127.0.0.1:8545/',
      // accounts: accounts will be given automatically by hardhat,
      chainId: 31337
    }
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    coinmarketcap: COIN_MARKET_CAP_API_KEY,
    outputFile: "gas-report.txt",
    noColors: true,
    token: 'MATIC'
  },
  etherscan: {
    apiKey: ETHER_SCAN_API_KEY,
  },
};

export default config;
