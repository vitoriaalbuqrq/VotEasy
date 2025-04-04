require("dotenv").config();
const Web3 = require("web3").default;

const CONTRACT_ABI = require("../config/contract/config");
const CONTRACT_ADDRESS = require("../config/contract/config");
const { parseDateTimeToTimestamp } = require("../utils/dateUtils");

//TODO: Melhorar as validações e tratamentos de erros
function initContract() {
  const network = process.env.ETHEREUM_NETWORK;

  const web3 = new Web3(
    `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
  );

  const signer = web3.eth.accounts.privateKeyToAccount(
    process.env.SIGNER_PRIVATE_KEY
  );
  web3.eth.accounts.wallet.add(signer);

  const smartContract = new web3.eth.Contract(
    CONTRACT_ABI.CONTRACT_ABI,
    CONTRACT_ADDRESS.CONTRACT_ADDRESS
  );
  return { network, signer, smartContract };
}

async function sendTransaction(tx, signer, network, res) {
  try {
    const receipt = await tx
      .send({
        from: signer.address,
        gas: await tx.estimateGas(),
      })
      .once("transactionHash", (txhash) => {
        console.log("Mining Transaction...");
        console.log(`https://${network}.etherscan.io/tx/${txhash}`);
      });

    console.log(`Mined in block ${receipt.blockNumber}`);
    return res.status(200).json({
      receipt: JSON.parse(
        JSON.stringify(receipt, (key, value) =>
          typeof value === "bigint" ? value.toString() : value
        )
      ),
      msg: "Transação confirmada!"
    });
  } catch (error) {
    console.error("Erro na transação:", error);
    return res.status(500).json({ error: error.message })
  }
}

const votingController = {
  create: async (req, res) => {
    try {
      const { network, smartContract, signer } = initContract();
      const startTimestamp = parseDateTimeToTimestamp(req.body.startDate, req.body.startTime);
      const endTimestamp = parseDateTimeToTimestamp(req.body.endDate, req.body.endTime);

      const tx = smartContract.methods.createVoting(
        req.body.name,
        req.body.description,
        startTimestamp,
        endTimestamp,
        req.body.candidateNames,
        req.body.candidateNumbers,
        req.body.candidateParties,
        req.body.status
      );

      return await sendTransaction(tx, signer, network, res);
      //res.status(201).json({ response, msg: "Votação criada com sucesso!"});
    } catch (error) {
      return res.status(500).json({ error: "Erro ao criar a votação" });
    }
  },
  vote: async (req, res) => {
    try {
      const { network, signer, smartContract } = initContract();

      const tx = smartContract.methods.vote(
        req.body.votingId,
        req.body.candidateId
      );

      return await sendTransaction(tx, signer, network, res);
      //res.status(201).json({ response, msg: "Voto confirmado!"});
    } catch (error) {
      return res.status(500).json({ error: "Erro ao votar" });
    }
  },
  
  getCandidate: async (req, res) => {
    try {
      const { smartContract } = initContract();
      const { votingId, candidateId } = req.params;
      //console.log(votingId, candidateId);
      const candidate = await smartContract.methods.getCandidate(candidateId, votingId).call();
      console.log(candidate)
      return res.json(JSON.parse(
        JSON.stringify(candidate, (key, value) =>
          typeof value === "bigint" ? value.toString() : value
        )
      ));
    } catch (error) {
      console.error("Erro ao buscar candidato:", error.message);
      return res.status(500).json({ error: "Erro ao buscar candidato" });
    }
  },
  getCandidatesByVoting: async (req, res) => {
    try {
      const { smartContract } = initContract();
      const votingId = req.params.votingId;
      const candidates = await smartContract.methods.getCandidatesByVoting(votingId).call();
      return res.json(JSON.parse(
        JSON.stringify(candidates, (key, value) =>
          typeof value === "bigint" ? value.toString() : value
        )
      ));
    } catch (error) {
      console.error("Erro ao buscar candidatos:", error.message);
    }
  },

  getVoting: async (req, res) => {
    try {
      const { smartContract } = initContract();
      const votingId = req.params.id;
      const voting = await smartContract.methods.getVoting(votingId).call();
      return res.json(JSON.parse(
        JSON.stringify(voting, (key, value) =>
          typeof value === "bigint" ? value.toString() : value
        )
      ));
    } catch (error) {
      console.error("Erro ao buscar votação:", error.message);
    }
  },

  getAllVotings: async (req, res) => {
    try {
      const { smartContract } = initContract();
      const votings = await smartContract.methods.getAllVotings().call();
      return res.json(JSON.parse(
        JSON.stringify(votings, (key, value) =>
          typeof value === "bigint" ? value.toString() : value
        )
      ));
    } catch (error) {
      console.error("Erro ao buscar votações:", error.message);
    }
  },

  getWinner: async (req, res) => {
    try {
      const { smartContract } = initContract();
      const votingId = req.params.votingId;
      const voting = await smartContract.methods.getWinner(votingId).call();
      return res.json(JSON.parse(
        JSON.stringify(voting, (key, value) =>
          typeof value === "bigint" ? value.toString() : value
        )
      ));
    } catch (error) {
      console.error("Erro ao buscar ganhador:", error.message);
    }
  },
  
  updateVotingStatus: async (req, res) => {
    try {
      const { network, signer, smartContract } = initContract();
      const { votingId, newStatus } = req.body;

      const voting = await smartContract.methods.getVoting(votingId).call();
      if (!voting) {
        return res.status(404).json({error: "Votação não encontrado!"})
      }

      const tx = smartContract.methods.updateVotingStatus(votingId, newStatus);
      return await sendTransaction(tx, signer, network, res);

    } catch (error) {
      console.error("Erro ao atualizar status:", error.message);
      return res.status(500).json({ error: "Erro ao atualizar status da votação" });
    }
  }

};

module.exports = votingController;
