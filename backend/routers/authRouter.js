const express = require("express");

const { User } = require("../models/user.js");
const { generateToken, verifyToken } = require("../controllers/auth.js");

const authRouter = express.Router();

authRouter.get("/", verifyToken, (req, res) => {
  return res.status(200).json({ message: "got user details", body: req.user });
});

authRouter.post("/login", async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const foundUser = await User.findOne({ username });
  if (!foundUser) {
    next("Wrong Credentials");
  } else {
    if (password !== foundUser.password) {
      next("Wrong Credentials");
    } else {
      const token = generateToken(foundUser);
      res
        .status(200)
        .cookie("token", token, { httpOnly: true })
        .json({ message: "Logged In Successfully" });
    }
  }
});

authRouter.post("/register", async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const foundUser = await User.findOne({ username });
  if (foundUser) {
    next("User already Exists");
  } else {
    const user = await User.create({ username, password });
    const token = generateToken(user);
    console.log(token);
    res
      .status(200)
      .cookie("token", token, { httpOnly: true })
      .json({ message: "Registered Successfully" });
  }
});

authRouter.post("/logout", async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged Out" });
});

module.exports = { authRouter };
