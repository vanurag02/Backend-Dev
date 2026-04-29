const mongoose = require("mongoose");

const connection = mongoose
  .connect(
    "mongodb+srv://anvaidya:Anurag456@cluster0.mwzoyzm.mongodb.net/dummy_database",
  )
  .then(() => {
    // IF SUCCESS = RESOLVE
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("Database connection failed ", err);
  });

module.exports = connection;
