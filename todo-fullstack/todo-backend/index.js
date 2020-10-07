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
// 包含app.类别(路径，function)
app.get("/todos", async (req, res) => {
  const results = await db.collection("todos").find().toArray();
  res.json(results);
});

app.post("/add", async (req, res) => {
  const result = await db.collection("todos").insertOne(req.body);
  res.json("posted");
});

app.delete("/delete/:idddd", async (req, res) => {
  await db.collection("todos").deleteOne({ _id: ObjectID(req.params.idddd) });
  res.json("deleted");
});

app.put("/put/:idzzz", async (req, res) => {
  await db
    .collection("todos")
    .replaceOne({ _id: ObjectID(req.params.idzzz) }, req.body);
  res.json("putted");
});

app.listen(3001, () => {
  console.log("backend setup: console test good");
});
