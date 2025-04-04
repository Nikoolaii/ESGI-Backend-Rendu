const express = require("express");
const app = express();

const authMiddleware = require('./middleware/auth.middleware');

const { connect } = require('./database/connection.js');

//always return json objects
app.use(express.json());

const database = async () => {
  await connect();
}

database();

//common headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', "GET, POST");

  next();
});


module.exports = app;