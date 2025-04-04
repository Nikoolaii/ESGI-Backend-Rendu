const express = require("express");
const app = express();

const { connect } = require('./database/connection.js');

//always return json objects
app.use(express.json());

const database = async () => {
  await connect();
}

database();

const authRoute = require("./routes/auth.route.js");
// const postRoute = require("./routes/post.route.js");
const commentRoutes = require("./routes/Commentaire.route");


//common headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', "GET, POST");

  next();
});

app.use('/auth', authRoute);
app.use('/post', postRoute);
app.use("/comments", commentRoutes);

module.exports = app;