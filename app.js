const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoutes = require('./routes/authroute');
// const Listing = require("./models/listing.js");
const path = require("path");
app.use('/auth',authRoutes);
// const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
// const wrapAsync = require("./utils/wrapAsync.js");
// const ExpressError = require("./utils/ExpressError.js");
// const { listingSchema , reviewSchema } = require("./schema.js");
// const Review = require("./models/review.js")

const MONGO_URL = "mongodb://127.0.0.1:27017/skillsync";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static("public"));


app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

app.post("/login", (req, res) => {
  res.redirect("/");
});

app.get("/register", (req, res) => {
  res.render("register", { title: "Register" });
});

app.post("/register", (req, res) => {
  res.redirect("/login");
});

app.get("/account", (req, res) => {
  const user = {
    name: "Jatin Pathak",
    email: "jatin@example.com",
    bio: "Full Stack Developer and AI Enthusiast",
    skills: ["Web Development", "Machine Learning", "Node.js"]
  };
  res.render("account", { title: "My Account", user });
});



app.get("/skills", (req, res) => {
  const skills = [
    "Web Development",
    "Data Science",
    "Robotics",
    "App Development",
    "Cybersecurity",
    "Machine Learning",
    "Cloud Computing",
    "DevOps",
    "Game Development",
    "Blockchain Technology",
    "Artificial Intelligence",
    "Internet of Things (IoT)",
      
  ];
  res.render("skills", { title: "Skills", skills });
});



// GET chat page
app.get("/chat", async (req, res) => {
  const messages = await Chat.find().sort({ createdAt: 1 }); // Fetch all messages
  res.render("chat", { user: req.user, messages });
});

// POST message
app.post("/chat/send", async (req, res) => {
  const { text } = req.body;
  await Chat.create({
    sender: req.user.name,
    text,
    timestamp: new Date().toLocaleTimeString()
  });
  res.sendStatus(200);
});


app.get("/about", (req, res) => {
  res.send("About Page");
});



app.listen(3000, () => {
  console.log("server is listening to port 3000");
}); 
