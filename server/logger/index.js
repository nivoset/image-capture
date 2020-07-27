const express = require("express");
const bodyParser = require("body-parser");
const expressWinston = require("express-winston");
const winston = require("winston");

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://rt-images:iiNLVifuss2LJeXY@cluster0.0u40g.mongodb.net/rt?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let log;

client.connect(err => {
  log = client.db("rt").collection("logs");
  if (err) console.error(err);
  //log.dropIndex({ createdAt: 1});
  //log.createIndex( { createdAt: 1 }, { expireAfterSeconds: 86400 * 14 } )
  
  // perform actions on the collection object
  //client.close();
});



const app = express.Router();
// app.use(expressWinston.logger({
//   transports: [
//     new winston.transports.Console()
//   ],
//   format: winston.format.combine(
//     winston.format.colorize(),
//     winston.format.json()
//   ),
//   meta: true, // optional: control whether you want to log the meta data about the request (default to true)
//   msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
//   expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
//   colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
//   ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
// }));

app.post("/log", bodyParser.json(), (req, res) => {
  const { level, data, date } = req.body;
  console.log(level, date, data)
  log.insertOne({ level, data, createdAt: new Date(date)});
  res.send("OK");
});

module.exports = app;