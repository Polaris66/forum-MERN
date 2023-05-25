const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) => {
  const token = jwt.sign(
    {
      _id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    {}
  );
  return token;
};

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.user = null;
    next();
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      console.log(req.user);
      next();
    } catch (error) {
      res.clearCookie("token");
      res.user = null;
      next();
    }
  }
};

module.exports = { generateToken, verifyToken };
