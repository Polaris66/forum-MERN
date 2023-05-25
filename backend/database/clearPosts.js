require("dotenv").config();
const { connect } = require("./connect.js");
const { Post } = require("../models/post.js");

const deleteAll = async () => {
  connect().then(
    () => {
      console.log("Connected");
      Post.deleteMany({}).then(
        () => {
          console.log("Cleared Posts");
          process.exit();
        },
        (error) => {
          console.log(error);
        }
      );
    },
    (error) => {
      console.log(error);
    }
  );
};

deleteAll();
