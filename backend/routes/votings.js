const router = require("express").Router();
const votingController = require("../controllers/VotingController");
const { checkToken, checkRole} = require("../middlewares/authMiddleware");

//TODO: Melhorar nome das rotas correspondente ao front
router.route("/voting", checkToken, checkRole("ORGANIZER"))
  .post((req, res) => votingController.create(req, res));

router.post("/vote", checkToken, votingController.vote);

router.post("/cancel-voting", checkToken, checkRole("ORGANIZER"), votingController.cancelVoting);

router.get("/candidate/:candidateId/:votingId", votingController.getCandidate);

router.get("/candidates/:votingId", votingController.getCandidatesByVoting);

router.get("/voting/:id", votingController.getVoting);

router.get("/votings", votingController.getAllVotings);

router.get("/votings/with-candidates", votingController.getAllVotingsWithCandidates);

router.get("/winner/:votingId", votingController.getWinner);

router.post("/voting", checkToken, checkRole("ORGANIZER"), votingController.create);

/*router.route("/vote", checkToken)
  .post((req, res) => votingController.vote(req, res));
router.post("/vote", checkToken, votingController.vote);

router.route("/cancel-voting", checkToken, checkRole("ORGANIZER"))
  .post((req, res) => votingController.cancelVoting(req, res));

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
  .get((req, res) => votingController.getWinner(req, res));*/
  
module.exports = router;