const express = require("express");
const cors = require("cors");
const volleyball = require("volleyball");
const dotenv = require("dotenv");

dotenv.config();

const { connect } = require("./database/connect.js");
const { Post } = require("./models/post.js");

const app = express();
app.use(cors());
app.use(express.json());
app.use(volleyball);

app.get("/", async (req, res) => {
  const posts = await Post.find({});
  res.send(posts);
}); //Get all posts

app.post("/", async (req, res) => {
  console.log(req.body);
  const post = new Post(req.body);
  const savedPost = await post.save();
  console.log(savedPost);
  res.send(savedPost);
});

const port = process.env.PORT;
connect().then(() => {
  console.log("connected to database");
  app.listen(port, () => {
    console.log(`listening on ${port}`);
  });
});
