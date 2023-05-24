const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({ data: ["Work,sleep,done"] });
}); //Get all posts

app.listen(2625, () => {
  console.log("listening on 2625");
});
