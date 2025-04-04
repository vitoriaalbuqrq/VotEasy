require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
require("./config/auth/passport"); 

const app = express();

app.use(express.json());

app.use(cors());

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

app.listen(3000, function () {
  console.log("Servidor online!");
})