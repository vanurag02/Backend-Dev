/* =============== IMPORTS =============== */
const express = require("express");
const app = express();

/* =============== HOST AND PORT =============== */
const HOST = "127.0.0.1";
const PORT = 3000;

/* =============== MIDDLEWARES =============== */
app.use(express.static("public/"));
app.use(express.urlencoded({ extended: true }));

/* =============== DATABASE CONNECTION IMPORT =============== */
const connection = require("./config/db");

/* =============== SCHEMA IMPORT =============== */
const userSchema = require("./model/profileSchema");
const profileSchema = require("./model/profileSchema");

/* =============== MULTER SETUP =============== */
const multer = require("multer");
const Storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: (res, file, callback) => {
    callback(null, Date.now() + "_" + file.originalname);
  },
});

/* =============== MULTER STORAGE SETUP =============== */
const upload = multer({ storage: Storage });

/* =============== BASE ROUTE =============== */
app.get("/", (req, res) => {
  try {
    res.render("signup.ejs");
  } catch (error) {
    console.log(error.message);
  }
});

/* =============== CREATE =============== */
app.post("/signup", upload.single("userProfile"), async (req, res) => {
  try {
    const { userName, userEmail, userPassword, userPhone, userAddress } =
      req.body;
    const userProfile = req.file.filename;

    // FEILDS CHECKING
    if (
      !userName ||
      !userEmail ||
      !userPassword ||
      !userPhone ||
      !userAddress ||
      !userProfile
    ) {
      return res.send("All fields are required.");
    }

    const result = new profileSchema({
      userName,
      userEmail,
      userPassword,
      userPhone,
      userAddress,
      userProfile,
    });
    await result.save();
    return res.redirect("/userprofiles");
  } catch (error) {
    console.log(error.message);
  }
});

/* =============== READ =============== */
app.get("/userprofiles", async (req, res) => {
  try {
    const result = await profileSchema.find();
    res.render("userprofiles.ejs", { data: result });
  } catch (error) {
    console.error(error.message);
  }
});

/* =============== DELETE =============== */
app.get("/delete/:id", async (req, res) => {
  try {
    let id = req.params.id;
    await profileSchema.findByIdAndDelete(id);
    return res.redirect("/userprofiles");
  } catch (error) {
    console.log(error.message);
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
