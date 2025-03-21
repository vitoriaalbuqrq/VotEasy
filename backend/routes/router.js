const router = require("express").Router();

const VotingRouter = require("./votings");
router.use("/", VotingRouter);

module.exports = router;