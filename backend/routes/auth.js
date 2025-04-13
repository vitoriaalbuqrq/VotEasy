const router = require("express").Router();
const authController = require("../controllers/authController");
const oauthController = require("../controllers/oAuthController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/confirm", authController.confirmEmail);

// Google OAuth
router.get("/auth/google", oauthController.googleAuth);
router.get("/auth/google/callback", oauthController.googleCallback, oauthController.googleCallbackHandler);
router.get("/logout", oauthController.logout);

module.exports = router;