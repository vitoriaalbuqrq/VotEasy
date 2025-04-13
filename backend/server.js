require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
require("./config/auth/passport"); 

const app = express();

app.use(express.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser()); 

app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true,
}));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());

const routes = require("./routes/router"); 
app.use("/api", routes);

app.listen(3333, function () {
  console.log("Servidor online!");
})