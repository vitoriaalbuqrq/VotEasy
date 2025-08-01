const passport = require("passport");

const oauthController = {
  googleAuth: (req, res, next) => {
    const state = req.query.state || 'USER';
    passport.authenticate("google", {
      scope: ["profile", "email"],
      state: state
    })(req, res, next);
  },

  googleCallback: passport.authenticate("google", { failureRedirect: "/" }),

  googleCallbackHandler: (req, res) => {
    const { token, user } = req.user;
    // Adiciona o token ao cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 3600 * 1000,
      path: "/",
    });
    //res.setHeader('Set-Cookie', `token=${token}; Path=/; HttpOnly; Max-Age=3600; Secure; SameSite=Strict`);

    // Redireciona para o dashboard com o token no cookie
    res.redirect(`http://localhost:3000/auth/callback?role=${user.role}`);
    //res.redirect(`http://localhost:3000/dashboard?token=${token}`);
  },

  logout: (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);

      // Limpa o cookie
      res.setHeader('Set-Cookie', 'token=; Path=/; HttpOnly; Max-Age=0; Secure; SameSite=Strict');

      return res.status(200).json({ message: "Deslogado com sucesso" });
    });
  }
};

module.exports = oauthController;