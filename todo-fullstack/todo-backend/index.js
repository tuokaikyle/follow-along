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

// 不能漏掉 /
app.get("/todos", async (req, res) => {
  const results = await db.collection("todos").find().toArray();
  res.json(results);
});

app.post("/add", async (req, res) => {
  const result = await db.collection("todos").insertOne(req.body);
  res.json("posted");
});

app.listen(3001, () => {
  console.log("backend setup: console test good");
});
