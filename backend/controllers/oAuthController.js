const passport = require("passport");

const oauthController = {
  googleAuth: passport.authenticate("google", { scope: ["profile", "email"] }),

  googleCallback: passport.authenticate("google", { failureRedirect: "/" }),

  googleCallbackHandler: (req, res) => {
    const { token, user } = req.user;
    res.json({ token, user });
  },

  logout: (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.redirect("/");
    });
  }
};

module.exports = oauthController;