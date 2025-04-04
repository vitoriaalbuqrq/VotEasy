const router = require("express").Router();

const VotingRouter = require("./votings");
router.use("/", VotingRouter);

const AuthRouter = require("./auth");
router.use("/auth", AuthRouter);

module.exports = router;