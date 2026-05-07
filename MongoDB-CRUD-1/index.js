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

/* =============== CREATE =============== */
app.post("/saveform", async (req, res) => {
  try {
    const result = new userSchema(req.body); // INSTANCE CREATED
    await result.save();
    res.redirect("/userdata");
    console.log("User registered successfully");
  } catch (error) {
    res.send("Something went wrong while storing the data.");
    console.error(error.message);
  }
});

/* =============== READ =============== */
app.get("/userdata", async (req, res) => {
  try {
    const result = await userSchema.find();
    res.render("userdata.ejs", { data: result });
    console.log("Data fetched successfully");
  } catch (error) {
    res.send("Something went wrong while getting the data.");
    console.error(error.message);
  }
});

/* =============== UPDATE FORM =============== */
app.get("/edit/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let result = await userSchema.findById(id);
    res.render("edit.ejs", { data: result });
  } catch (error) {
    res.send("Something went wrong.");
    console.error(error.message);
  }
});

/* =============== UPDATE =============== */
app.post("/updateform/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let result = req.body;
    await userSchema.findByIdAndUpdate(id, result);
    res.redirect("/userdata");
    console.log("User updated successfully");
  } catch (error) {
    res.send("Something went wrong while updating the data.");
    console.error(error.message);
  }
});

/*

1. FETCH THE DATA FROM DATABASE OF THE SPECIFIC USER.
2. THEN RENDER TO EDIT PAGE WITH USER DATA
3. DISPLAY THAT DATA IN A FORM AND THEN PERFORM THE UPDATE OPERATION

*/

/* =============== DELETE =============== */
app.get("/delete/:id", async (req, res) => {
  try {
    // ACCESSING ID -> req.params.id
    let id = req.params.id;
    await userSchema.findByIdAndDelete(id);
    res.redirect("/userdata");
    console.log("User deleted successfully.");
  } catch (error) {
    res.send("Something went wrong while deleting the data.");
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
