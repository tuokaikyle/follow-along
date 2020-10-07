const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json("backend setup: browser tester good");
});

app.listen(3001, () => {
  console.log("backend setup: console test good");
});
