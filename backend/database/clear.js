require("dotenv").config();
const { connect } = require("./connect.js");
const { Post } = require("../models/post.js");

const deleteAll = async () => {
  connect().then(
    () => {
      console.log("Connected");
      Post.deleteMany({}).then(
        () => {
          console.log("Cleared Database");
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
