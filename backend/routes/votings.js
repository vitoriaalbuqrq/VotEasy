const router = require("express").Router();
const votingController = require("../controllers/VotingController");
const { checkToken, checkRole} = require("../middlewares/authMiddleware");

router.post("/voting", checkToken, checkRole("ORGANIZER"), votingController.create);

router.post("/vote", checkToken, votingController.vote);

router.post("/cancel-voting", checkToken, checkRole("ORGANIZER"), votingController.cancelVoting);

router.get("/candidate/:candidateId/:votingId", votingController.getCandidate);

router.get("/candidates/:votingId", votingController.getCandidatesByVoting);

router.get("/voting/:id", votingController.getVoting);

router.get("/votings", votingController.getAllVotings);

router.get("/votings/with-candidates", checkToken, votingController.getUserVotingsWithCandidates);

router.get("/winner/:votingId", votingController.getWinner);
  
module.exports = router;