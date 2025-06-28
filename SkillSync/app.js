const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoutes = require('./routes/authroute');
const path = require("path");
const ejsMate = require("ejs-mate");
const Chat = require('./models/chat');
const Message = require('./models/message');
const session = require("express-session");
const { setAuthFlag } = require("./middleware/middleware");

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: "dfnsshnsh",
  resave: false,
  saveUninitialized: false
}));
app.use(setAuthFlag);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static("public"));
app.use('/auth',authRoutes);

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
    "Web-Development",
    "Data-Science",
    "Robotics",
    "App-Development",
    "Cybersecurity",
    "Machine-Learning",
    "Cloud-Computing",
    "DevOps",
    "Game-Development",
    "Blockchain-Technology",
    "Artificial-Intelligence",
    "Internet of Things (IoT)",
      
  ];
  res.render("skills", { title: "Skills", skills });
  
});

//show skill card
app.get("/showSkillCards", (req, res) => {
  res.redirect("/showSkillCards");
});



// GET chat page
app.get("/chat", async (req, res) => {
  const messages = await Chat.find().sort({ createdAt: 1 }); // Fetch all messages
  res.render("chat", { user: req.user, messages });
});

// POST message
app.post('/chat/send', async (req, res) => {
  const { text } = req.body;
  const timestamp = new Date().toLocaleTimeString();

  // Simulate a logged-in user
  const senderName = 'Aditya Gaur'; // Replace with your actual name or email

  const message = new Message({
    sender: senderName,
    receiver: 'Alice Sharma',
    text,
    timestamp
  });

  await message.save();
  res.json({ success: true, timestamp });
});





app.get("/chat", async (req, res) => {
  // You should replace this with proper authentication
  if (!req.user) {
    return res.redirect("/login");
  }
  
  try {
    const messages = await Chat.find().sort({ createdAt: 1 });
    res.render("chat", { user: req.user, messages });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});


app.get("/about", (req, res) => {
  res.render("about", { title: "about" });
});

app.get("/Web-Development", (req, res) => {
  res.render("Web-Development", { title: "Web-Development" });
});


app.get("/Data-Science", (req, res) => {
  res.render("Data-Science", { title: "Data-Science" });
});

app.get("/Robotics", (req, res) => {
  res.render("Robotics", { title: "Robotics" });
});

app.get("/App-Development", (req, res) => {
  res.render("App-Development", { title: "App-Development" });
});

app.get("/Cybersecurity", (req, res) => {
  res.render("Cybersecurity", { title: "Cybersecurity" });
});

app.get("/Machine-Learning", (req, res) => {
  res.render("Machine-Learning", { title: "Machine-Learning" });
});

app.get("/Cloud-Computing", (req, res) => {
  res.render("Cloud-Computing", { title: "Cloud-Computing" });
});

app.get("/DevOps", (req, res) => {
  res.render("DevOps", { title: "DevOps" });
});

app.get("/Game-Development", (req, res) => {
  res.render("Game-Development", { title: "Game-Development" });
});

app.get("/Blockchain-Technology", (req, res) => {
  res.render("Blockchain-Technology", { title: "Blockchain-Technology" });
});

app.get("/Artificial-Intelligence", (req, res) => {
  res.send("Artificial-Intelligence"); 
});

app.listen(3000, () => {
  console.log("server is listening to port 3000");
}); 
