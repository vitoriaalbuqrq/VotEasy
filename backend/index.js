require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const routes = require("./routes/router"); 
app.use("/api", routes);

app.listen(3000, function () {
  console.log("Servidor online!");
})