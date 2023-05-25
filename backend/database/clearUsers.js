require("dotenv").config();
const { connect } = require("./connect.js");
const { User } = require("../models/user.js");

const deleteAll = async () => {
  connect().then(
    () => {
      console.log("Connected");
      User.deleteMany({}).then(
        () => {
          console.log("Cleared Users");
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
