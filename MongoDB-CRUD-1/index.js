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

/* =============== SCHEMA IMPORT =============== */
const userSchema = require("./model/userSchema");

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
app.post("/saveform", async (req, res) => {
  try {
    const result = new userSchema(req.body); // INSTANCE CREATED
    await result.save();
    res.redirect("/userdata");
    console.log("User registered successfully");
  } catch (error) {
    console.error("Something went wrong ", error.message);
  }
});

/* =============== READING DATA =============== */
app.get("/userdata", async (req, res) => {
  try {
    const result = await userSchema.find();
    res.render("userdata.ejs", { data: result });
    console.log("Data fetched successfully");
  } catch (error) {
    console.error("Something went wrong ", error.message);
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
