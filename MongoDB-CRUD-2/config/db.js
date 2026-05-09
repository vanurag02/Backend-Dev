const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/crud_2");
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Database connection failed. ", error.message);
  }
};

connection();
module.exports = connection;

/*

=============== MONGODB CONNECITON READY STATE CODES ===============

0 = disconnected
1 = connected
2 = connecting
3 = disconnecting
99 = uninitialized

*/
