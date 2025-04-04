const mongoose = require("mongoose");
require("dotenv").config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_HOST);
    console.log("connected to database");
  } catch (error) {
    console.error("Error database connection" + error);
  }
}

module.exports = { connect };
