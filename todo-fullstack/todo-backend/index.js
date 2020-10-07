// 1
const express = require("express");
const cors = require("cors");
// 23 因为第22步出错
const bodyParser = require("body-parser");
const app = express();

// 11
app.use(cors());
// 24
app.use(bodyParser.json());

// 4
// 29 第28步不能使用纯粹的string, 所以此时需要objectID 转化类型
const { MongoClient, ObjectID } = require("mongodb");
let db;
MongoClient.connect(
  "mongodb://localhost:27017/todos",
  { useUnifiedTopology: true },
  async function (err, client) {
    if (err) throw err;
    db = client.db("todos");
    // 4 end

    // 11 用于每次query之后，删除现有结果。不会累加上一次的结果。可以结合在6里面。
    await db.collection("todos").deleteMany();

    // 6
    await db.collection("todos").insertMany([
      { done: true, desc: "write code" },
      { done: true, desc: "fix bugs" },
      { done: false, desc: "profit" },
    ]);
    // 此时去前端 app.js 见readMe
  }
);

// 3
app.get("/", (req, res) => {
  res.json("did this work!");
});

// 5
app.get("/todos", async (req, res) => {
  const todos = await db.collection("todos").find().toArray();
  res.json(todos);
});

// 22
app.post("/todos", async (req, res) => {
  await db.collection("todos").insertOne(req.body);
  res.json("posted");
});

// 28
app.delete("/todos/:id", async (req, res) => {
  await db.collection("todos").deleteOne({ _id: ObjectID(req.params.id) });
  res.json("deleted");
});

// 34
app.put("/todos/:id", async (req, res) => {
  await db
    .collection("todos")
    // 注意req.body，是给了新的document? toogle之后不自动删除
    .replaceOne({ _id: ObjectID(req.params.id) }, req.body);
  res.json("putted");
});

// 2
app.listen(3001, () => {
  console.log("work pls");
});
//
