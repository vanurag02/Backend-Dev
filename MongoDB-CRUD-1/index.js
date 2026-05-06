/* =============== IMPORTS =============== */
const express = require("express");
const app = express();

/* =============== HOST AND PORT =============== */
const HOST = "127.0.0.1";
const PORT = 3000;

/* =============== MIDDLEWARES =============== */
app.use(express.static("/public"));
app.use(express.urlencoded({ extended: true }));

/* =============== DATABASE CONNECTION IMPORT =============== */
const connection = require("./config/db");

/* =============== BASIC ROUTE =============== */
app.get("/", (req, res) => {
  try {
    res.render("home.ejs");
  } catch (err) {
    res.send("Something went wrong.");
    console.error(err.message);
  }
});

/* =============== HANDLING USER DATA =============== */
app.post("/saveform", (req, res) => {
  try {
    res.send(req.body);
    console.log("User registered successfully");
  } catch (error) {
    console.error(error.message);
  }
});

/* =============== FALLBACK FOUTING =============== */
app.use((req, res) => {
  res.render("error.ejs");
});

/* =============== SERVER LISTEN =============== */
app.listen(PORT, HOST, () => {
  console.log(`Server is up on http://${HOST}:${PORT}`);
});
