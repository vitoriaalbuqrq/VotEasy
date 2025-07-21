const router = require("express").Router();
const passport = require("passport");
const authController = require("../controllers/authController");
const oauthController = require("../controllers/oAuthController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/confirm", authController.confirmEmail);
router.get("/logout", authController.logout);

// Google OAuth
router.get("/auth/google", oauthController.googleAuth);

router.get(
  "/auth/google/callback",
  (req, res, next) => {
    passport.authenticate("google", (err, user, info) => {
      if (err) {
        // Redireciona com mensagem de erro
        return res.redirect(`http://localhost:3000/auth/callback?error=${encodeURIComponent(err.message)}`);
      }
      req.user = user;
      next();
    })(req, res, next);
  },
  oauthController.googleCallbackHandler
);


module.exports = router;