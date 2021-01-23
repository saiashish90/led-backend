"use strict";
require("dotenv").config();
const express = require("express");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const { PassThrough } = require("serverless-http/lib/request");
admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE)),
});
const db = admin.firestore();
const app = express();

const router = express.Router();
router.get("/", async (req, res) => {
  if (Object.keys(req.query).length === 2) {
    try {
      const doc = await db.collection("leds").doc(req.query.user).get();
      const leds = doc.data();
      res.send(leds[req.query.led]);
    } catch (e) {
      res.send("invalid parameters");
    }
  } else res.send("invalid query");
});

app.use(bodyParser.json());
app.use("/.netlify/functions/server", router); // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
