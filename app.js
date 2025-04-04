const express = require("express");
const app = express();

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

app.use('/auth', authRoute);
app.use('/post', postRoute);

app.use('/auth', authRoute);

module.exports = app;