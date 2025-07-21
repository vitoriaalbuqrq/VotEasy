const Web3 = require("web3").default;
const web3 = new Web3();

const getUserHash = (userId) => {
  return web3.utils.keccak256(userId.toString());
};

module.exports = { getUserHash };
