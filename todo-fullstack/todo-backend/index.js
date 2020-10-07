const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient, ObjectID } = require("mongodb");

const app = express();
app.use(cors());
app.use(bodyParser.json());
let db;
MongoClient.connect(
  "mongodb://localhost:27017/todos",
  { useUnifiedTopology: true },
  async function (err, client) {
    if (err) throw err;
    db = client.db("todos");
    console.log("mongodb connected");
  }
);

app.get("/", (req, res) => {
  res.json("backend setup: browser tester good");
});

app.listen(3001, () => {
  console.log("backend setup: console test good");
});
