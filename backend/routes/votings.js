const router = require("express").Router();
const votingController = require("../controllers/VotingController");
const { checkToken, checkRole} = require("../middlewares/authMiddleware");

//TODO: Melhorar nome das rotas correspondente ao front
router.route("/voting", checkToken, checkRole("ORGANIZER"))
  .post((req, res) => votingController.create(req, res));

router.route("/vote", checkToken)
  .post((req, res) => votingController.vote(req, res));

router.route("/update-status", checkToken, checkRole("ORGANIZER"))
  .post((req, res) => votingController.updateVotingStatus(req, res));

router.route("/candidate/:candidateId/:votingId")
  .get((req, res) => votingController.getCandidate(req, res));

router.route("/candidates/:votingId")
  .get((req, res) => votingController.getCandidatesByVoting(req, res));
  
router.route("/voting/:id")
  .get((req, res) => votingController.getVoting(req, res));

router.route("/votings")
  .get((req, res) => votingController.getAllVotings(req, res));

router.route("/votings/with-candidates")
  .get((req, res) => votingController.getAllVotingsWithCandidates(req, res));

router.route("/winner/:votingId")
  .get((req, res) => votingController.getWinner(req, res));
  
module.exports = router;