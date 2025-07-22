const Web3 = require("web3").default;
const web3 = new Web3();

const decodeRevertReason = (data) => {
  try {
    const errorHex = data.slice(10); // remove o "function selector"
    return web3.eth.abi.decodeParameter("string", errorHex);
  } catch (e) {
    return "Erro desconhecido na execução do contrato.";
  }
};

module.exports = { decodeRevertReason };

