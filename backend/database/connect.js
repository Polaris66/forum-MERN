const mongoose = require("mongoose");
const { Post } = require("../models/post");

const connect = async () => {
  const uri = process.env.MONGO_DB_URI;
  const connection = await mongoose.connect(uri);
  await dummyValues("Learn Coding");
  await dummyValues("Sleep");
};

const dummyValues = async (value) => {
  const foundValue = await Post.findOne({ title: value });
  if (!foundValue) {
    const post = new Post({ title: value });
    await post.save();
  }
};

module.exports = { connect };
