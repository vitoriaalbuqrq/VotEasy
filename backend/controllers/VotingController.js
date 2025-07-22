require("dotenv").config();
const Web3 = require("web3").default;
const web3 = new Web3();

const CONTRACT_ABI = require("../config/contract/config");
const CONTRACT_ADDRESS = require("../config/contract/config");
const { parseDateTimeToTimestamp } = require("../utils/dateUtils");
const { decodeRevertReason } = require("../utils/decodeRevertReason");
const { success, error } = require("../utils/responseHandler");
const { getUserHash } = require("../utils/userHash");

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

async function sendTransaction(tx, signer, network, res, message, status) {
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
    return success(res, message, JSON.parse(
      JSON.stringify(receipt, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      ), 
      status
    ));
  } catch (err) {
    console.error("Erro na transação:", err);
    let revertMessage = err.message || "Erro interno na transação.";

    if (err?.data) {
      revertMessage = decodeRevertReason(err.data);
    } else if (err?.cause?.data) {
      revertMessage = decodeRevertReason(err.cause.data);
    }

    return error(res, revertMessage);
  }
}

function getVotingStatus(voting) {
  const now = Math.floor(Date.now() / 1000);

  if (voting.isCanceled) return "canceled";
  if (now < Number(voting.startDate)) return "scheduled";
  if (now >= Number(voting.startDate) && now <= Number(voting.endDate))
    return "active";
  if (now > Number(voting.endDate)) return "finalized";

  return "unknown";
}

const votingController = {
  create: async (req, res) => {
    try {
      const userId = req.user?.id;
      if (!userId) return error(res, "Usuário não autenticado!", 401);

      const creatorIdHash = getUserHash(userId)

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
        creatorIdHash
      );

      return await sendTransaction(tx, signer, network, res, "Votação criada com sucesso!", 201);
    } catch (err) {
      console.error("Erro ao criar votação:", err);
      return error(res, "Erro ao criar a votação!");
    }
  },
  vote: async (req, res) => {
    try {
      const { network, signer, smartContract } = initContract();
      const userId = req.user?.id;

      if (!userId) return error(res, "Usuário não autenticado!", 401);

      //Hash unico do usuario
      const userIdHash = web3.utils.keccak256(userId.toString());

      const tx = smartContract.methods.vote(
        req.body.votingId,
        req.body.candidateId,
        userIdHash
      );

      return await sendTransaction(tx, signer, network, res, "Voto confirmado!", 201);
      //res.status(201).json({ response, msg: "Voto confirmado!"});
    } catch (err) {
      console.error("Erro ao votar:", err);
      return error(res, "Erro ao votar!");
    }
  },

  getCandidate: async (req, res) => {
    try {
      const { smartContract } = initContract();
      const { votingId, candidateId } = req.params;
      //console.log(votingId, candidateId);
      const candidate = await smartContract.methods
        .getCandidate(candidateId, votingId)
        .call();
      console.log(candidate);
      return res.json(
        JSON.parse(
          JSON.stringify(candidate, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        )
      );
    } catch (err) {
      console.error("Erro ao buscar candidato:", err.message);
      return error(res, "Erro ao buscar candidato!");
    }
  },
  getCandidatesByVoting: async (req, res) => {
    try {
      const { smartContract } = initContract();
      const votingId = req.params.votingId;
      const candidates = await smartContract.methods
        .getCandidatesByVoting(votingId)
        .call();
      return res.json(
        JSON.parse(
          JSON.stringify(candidates, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        )
      );
    } catch (err) {
      console.error("Erro ao buscar candidatos:", err.message);
      return error(res, "Erro ao buscar candidatos!");
    }
  },

  getVoting: async (req, res) => {
    try {
      const { smartContract } = initContract();
      const votingId = req.params.id;
      const voting = await smartContract.methods.getVoting(votingId).call();

      const votingWithStatus = {
        ...voting,
        id: votingId,
        status: getVotingStatus(voting),
      };

      return res.json(
        JSON.parse(
          JSON.stringify(votingWithStatus, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        )
      );
    } catch (err) {
      console.error("Erro ao buscar votação:", err.message);
      return error(res, "Erro ao buscar votação!");
    }
  },

  getAllVotings: async (req, res) => {
    try {
      const { smartContract } = initContract();
      const votings = await smartContract.methods.getAllVotings().call();

      const votingsWithStatus = votings.map((voting, index) => ({
        ...voting,
        id: voting.id ?? index.toString(),
        status: getVotingStatus(voting),
      }));

      return res.json(
        JSON.parse(
          JSON.stringify(votingsWithStatus, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        )
      );
    } catch (err) {
      console.error("Erro ao buscar votações:", err.message);
      return error(res, "Erro ao buscar votações!");
    }
  },

  getUserVotingsWithCandidates: async (req, res) => {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ msg: "Usuário não autenticado" });
      
      const { smartContract } = initContract();
      const allVotings = await smartContract.methods.getAllVotings().call();
      
      const creatorIdHash =getUserHash(userId)

      const userVotings = allVotings.filter(
        (voting) => voting.creatorId?.toLowerCase() === creatorIdHash.toLowerCase()
      );

      const votingsWithCounts = await Promise.all(
        userVotings.map(async (voting, index) => {
          const votingId = voting.id ?? index.toString();
          const candidates = await smartContract.methods
            .getCandidatesByVoting(votingId)
            .call();

          return {
            ...voting,
            id: votingId,
            qntCandidates: candidates.length,
            status: getVotingStatus(voting),
          };
        })
      );

      return res.json(
        JSON.parse(
          JSON.stringify(votingsWithCounts, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        )
      );
    } catch (err) {
      console.error("Erro ao buscar votações com candidatos:", err.message);
      return error(res, "Erro ao buscar votações com candidatos!");
    }
  },

  getWinner: async (req, res) => {
    try {
      const { smartContract } = initContract();
      const votingId = req.params.votingId;
      const voting = await smartContract.methods.getWinner(votingId).call();
      return res.json(
        JSON.parse(
          JSON.stringify(voting, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        )
      );
    } catch (err) {
      console.error("Erro ao buscar ganhador:", err.message);
      return error(res, "Erro ao buscar ganhador!");
    }
  },

  cancelVoting: async (req, res) => {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ msg: "Usuário não autenticado" });

      const { network, signer, smartContract } = initContract();
      const { votingId } = req.body;

      const creatorIdHash =getUserHash(userId)

      const voting = await smartContract.methods.getVoting(votingId).call();
      if (!voting) {
        return res.status(404).json({ error: "Votação não encontrado!" });
      }

      const tx = smartContract.methods.cancelVoting(votingId, creatorIdHash);
      return await sendTransaction(tx, signer, network, res, "Votação cancelada!", 201);
    } catch (err) {
      console.error("Erro ao cancelar votação:", err.message);
      return error(res, "Erro ao cancelar votação!");
    }
  },
};

module.exports = votingController;
