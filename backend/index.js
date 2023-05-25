const express = require("express");
const cors = require("cors");
const volleyball = require("volleyball");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();

const { connect } = require("./database/connect.js");
const { Post } = require("./models/post.js");
const { authRouter } = require("./routers/authRouter.js");
const { errorHandler } = require("./controllers/errorHandler.js");
const { verifyToken } = require("./controllers/auth.js");

const app = express();

//Imported Middleware
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(volleyball);
app.use(cookieParser());

//Defined Middleware
app.use("/auth", authRouter);

app.get("/", verifyToken, async (req, res) => {
  const posts = await Post.find({});
  res.send({ message: "Posts found", body: posts });
}); //Get all posts

app.post("/", verifyToken, async (req, res) => {
  console.log(req.body);
  const post = new Post(req.body);
  const savedPost = await post.save();
  console.log(savedPost);
  res.json({ message: "Post added", body: savedPost });
});

// app.use(errorHandler);

const port = process.env.PORT;
connect().then(() => {
  console.log("connected to database");
  app.listen(port, () => {
    console.log(`listening on ${port}`);
  });
});
