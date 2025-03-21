import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    hardhat: {},
    sepolia:{
      url: `https://sepolia.infura.io/v3/${process.env.RPC_NODE}`,
      chainId: Number(process.env.CHAIN_ID),
      accounts:{
        mnemonic: process.env.SECRET
      }
    }
  }
};

export default config;
