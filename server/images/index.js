const express = require("express");
const bodyParser = require("body-parser");
const app = express.Router();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://rt-images:iiNLVifuss2LJeXY@cluster0.0u40g.mongodb.net/rt?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let images;

client.connect(err => {
  images = client.db("rt").collection("images");
  if (err) console.error(err);
  //log.dropIndex({ createdAt: 1});
  images.createIndex( { createdAt: 1 }, { expireAfterSeconds: 86400 * 14 } )
  
  // perform actions on the collection object
  //client.close();
});
app.post("/images", bodyParser.json({limit: '50mb'}), (req, res) => {
  //console.log("SAVE IMAGE", req.body)
  images.insertOne(req.body).then(() => console.log("Saved"));
  res.send("OK");
});

module.exports = app;