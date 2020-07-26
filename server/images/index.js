const express = require("express");
const bodyParser = require("body-parser");
const app = express.Router();

app.post("/images", bodyParser.json(), (req, res) => {
  console.log(req.body)
  
  res.send("OK");
});

module.exports = app;