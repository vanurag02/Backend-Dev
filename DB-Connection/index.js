const express = require("express");
const app = express();

app.set("view engine", "ejs"); // ✅ required

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// DATABASE CONNECTION
require("./config/db");

// MODEL IMPORT
const User = require("./model/userSchema");

const PORT = 3000;
const HOST = "127.0.0.1";

app.get("/", (req, res) => {
  res.render("signup.ejs");
});

// INSERTING DATA
app.post("/saveform", async (req, res) => {
  try {
    const result = new User(req.body);
    await result.save();

    res.redirect("/userdata");
  } catch (err) {
    res.send("Internal Server Error");
    console.log(err);
  }
});

// READING DATA
app.get("/userdata", async (req, res) => {
  try {
    const result = await User.find();
    res.render("userdata.ejs", { data: result });
  } catch (err) {
    res.send("Internal Server Error");
    console.log(err);
  }
});

app.use((req, res) => {
  res.send("404, not found");
});

app.listen(PORT, HOST, () => {
  console.log(`Server is up on http://${HOST}:${PORT}`);
});
