const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { PrismaClient, Role } = require("@prisma/client");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3333/api/auth/auth/google/callback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      //TODO: Resolver atribuição de role
      const rawRole = req.query.state === 'ORGANIZER' ? 'ORGANIZER' : 'USER';
      const role = Role[rawRole];
      console.log("Callback com role:", role);

      try {
        let user = await prisma.user.findUnique({
          where: { email: profile.emails[0].value },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              name: profile.displayName,
              email: profile.emails[0].value,
              password: null,
              role,
            },
          });
        }

        const token = jwt.sign(
          { id: user.id, role: user.role }, 
          process.env.SECRET, {
          expiresIn: "1h",
        });

        return done(null, { user, token });
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

module.exports = passport;