const express = require("express");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser);
app.get("/api", (req, res) => {
  const newValue = "helo";
  res.json(newValue);
});

module.exports.handler = serverless(app);
