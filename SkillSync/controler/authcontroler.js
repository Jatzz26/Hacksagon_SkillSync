const User = require("../models/user");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res) => {
  try {
    console.log("register route start");

    const { name, sem, skills, email, password, enNumber } = req.body;

    if (!email || !sem || !skills || !password || !name || !enNumber) {
      return res.status(400).json({ message: "Enter all details" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      sem,
      skills,
      email,
      password: hashedPassword,
      EnrNmber: enNumber
    });

    await newUser.save();

    // ✅ Set session after registration
    req.session.user = {
      id: newUser._id,
      email: newUser.email,
      name: newUser.name
    };

    return res.status(200).json({ message: "User registered and logged in successfully" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Enter all details" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ Set session after login
    req.session.user = {
      id: user._id,
      email: user.email,
      name: user.name
    };

    return res.status(200).json({ message: "User logged in successfully" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ message: "Logout failed" });
    }
    res.redirect("/"); // or return res.json({ message: "Logged out successfully" });
  });
};

const users = [
  // Web Development (7)
  { name: "Alice Sharma", sem: 4, EnrNmber: "ENR001", skills: "Web Development", email: "alice@example.com", password: "pass123" },
  { name: "Rahul Verma", sem: 5, EnrNmber: "ENR002", skills: "Web Development", email: "rahul@example.com", password: "pass123" },
  { name: "Sneha Patel", sem: 6, EnrNmber: "ENR003", skills: "Web Development", email: "sneha@example.com", password: "pass123" },
  { name: "Aman Gupta", sem: 3, EnrNmber: "ENR004", skills: "Web Development", email: "aman@example.com", password: "pass123" },
  { name: "Divya Rao", sem: 2, EnrNmber: "ENR005", skills: "Web Development", email: "divya@example.com", password: "pass123" },
  { name: "Rohan Mehta", sem: 7, EnrNmber: "ENR006", skills: "Web Development", email: "rohan@example.com", password: "pass123" },
  { name: "Kriti Das", sem: 1, EnrNmber: "ENR007", skills: "Web Development", email: "kriti@example.com", password: "pass123" },

  // Data Science (6)
  { name: "Anjali Singh", sem: 6, EnrNmber: "ENR008", skills: "Data Science", email: "anjali@example.com", password: "pass123" },
  { name: "Mayank Joshi", sem: 4, EnrNmber: "ENR009", skills: "Data Science", email: "mayank@example.com", password: "pass123" },
  { name: "Pooja Iyer", sem: 5, EnrNmber: "ENR010", skills: "Data Science", email: "pooja@example.com", password: "pass123" },
  { name: "Sahil Batra", sem: 3, EnrNmber: "ENR011", skills: "Data Science", email: "sahil@example.com", password: "pass123" },
  { name: "Vivek Kaul", sem: 2, EnrNmber: "ENR012", skills: "Data Science", email: "vivek@example.com", password: "pass123" },
  { name: "Megha Jain", sem: 7, EnrNmber: "ENR013", skills: "Data Science", email: "megha@example.com", password: "pass123" },

  // Robotics (6)
  { name: "Neha Reddy", sem: 4, EnrNmber: "ENR014", skills: "Robotics", email: "neha@example.com", password: "pass123" },
  { name: "Arjun Desai", sem: 5, EnrNmber: "ENR015", skills: "Robotics", email: "arjun@example.com", password: "pass123" },
  { name: "Karan Malhotra", sem: 6, EnrNmber: "ENR016", skills: "Robotics", email: "karan@example.com", password: "pass123" },
  { name: "Isha Kapoor", sem: 2, EnrNmber: "ENR017", skills: "Robotics", email: "isha@example.com", password: "pass123" },
  { name: "Ritika Goyal", sem: 3, EnrNmber: "ENR018", skills: "Robotics", email: "ritika@example.com", password: "pass123" },
  { name: "Aakash Dey", sem: 8, EnrNmber: "ENR019", skills: "Robotics", email: "aakash@example.com", password: "pass123" },

  // App Development (6)
  { name: "Simran Kaur", sem: 5, EnrNmber: "ENR020", skills: "App Development", email: "simran@example.com", password: "pass123" },
  { name: "Harsh Sinha", sem: 4, EnrNmber: "ENR021", skills: "App Development", email: "harsh@example.com", password: "pass123" },
  { name: "Tanya Bhatt", sem: 3, EnrNmber: "ENR022", skills: "App Development", email: "tanya@example.com", password: "pass123" },
  { name: "Dev Singh", sem: 2, EnrNmber: "ENR023", skills: "App Development", email: "dev@example.com", password: "pass123" },
  { name: "Ravi Anand", sem: 6, EnrNmber: "ENR024", skills: "App Development", email: "ravi@example.com", password: "pass123" },
  { name: "Preeti Nair", sem: 8, EnrNmber: "ENR025", skills: "App Development", email: "preeti@example.com", password: "pass123" },

  // Cybersecurity (7)
  { name: "Varun Mishra", sem: 5, EnrNmber: "ENR026", skills: "Cybersecurity", email: "varun@example.com", password: "pass123" },
  { name: "Bhavya Shetty", sem: 4, EnrNmber: "ENR027", skills: "Cybersecurity", email: "bhavya@example.com", password: "pass123" },
  { name: "Rishabh Tomar", sem: 3, EnrNmber: "ENR028", skills: "Cybersecurity", email: "rishabh@example.com", password: "pass123" },
  { name: "Nikita Yadav", sem: 6, EnrNmber: "ENR029", skills: "Cybersecurity", email: "nikita@example.com", password: "pass123" },
  { name: "Suresh Menon", sem: 7, EnrNmber: "ENR030", skills: "Cybersecurity", email: "suresh@example.com", password: "pass123" },
  { name: "Aarav Jain", sem: 2, EnrNmber: "ENR031", skills: "Cybersecurity", email: "aarav@example.com", password: "pass123" },
  { name: "Mona Bansal", sem: 1, EnrNmber: "ENR032", skills: "Cybersecurity", email: "mona@example.com", password: "pass123" },

  // Machine Learning (7)
  { name: "Nikhil Rao", sem: 5, EnrNmber: "ENR033", skills: "Machine Learning", email: "nikhil@example.com", password: "pass123" },
  { name: "Shruti Nair", sem: 6, EnrNmber: "ENR034", skills: "Machine Learning", email: "shruti@example.com", password: "pass123" },
  { name: "Yash Khurana", sem: 4, EnrNmber: "ENR035", skills: "Machine Learning", email: "yash@example.com", password: "pass123" },
  { name: "Garima Soni", sem: 7, EnrNmber: "ENR036", skills: "Machine Learning", email: "garima@example.com", password: "pass123" },
  { name: "Aditya Verma", sem: 8, EnrNmber: "ENR037", skills: "Machine Learning", email: "adityav@example.com", password: "pass123" },
  { name: "Tanvi Kaushik", sem: 3, EnrNmber: "ENR038", skills: "Machine Learning", email: "tanvi@example.com", password: "pass123" },
  { name: "Ritvik Singh", sem: 2, EnrNmber: "ENR039", skills: "Machine Learning", email: "ritvik@example.com", password: "pass123" },

  // Cloud Computing (6)
  { name: "Devika Roy", sem: 4, EnrNmber: "ENR040", skills: "Cloud Computing", email: "devika@example.com", password: "pass123" },
  { name: "Sagar Prasad", sem: 5, EnrNmber: "ENR041", skills: "Cloud Computing", email: "sagar@example.com", password: "pass123" },
  { name: "Kavya Jaiswal", sem: 6, EnrNmber: "ENR042", skills: "Cloud Computing", email: "kavya@example.com", password: "pass123" },
  { name: "Irfan Khan", sem: 7, EnrNmber: "ENR043", skills: "Cloud Computing", email: "irfan@example.com", password: "pass123" },
  { name: "Zoya Sheikh", sem: 2, EnrNmber: "ENR044", skills: "Cloud Computing", email: "zoya@example.com", password: "pass123" },
  { name: "Lakshya Bhatt", sem: 3, EnrNmber: "ENR045", skills: "Cloud Computing", email: "lakshya@example.com", password: "pass123" },

  // DevOps (6)
  { name: "Prerna Tiwari", sem: 4, EnrNmber: "ENR046", skills: "DevOps", email: "prerna@example.com", password: "pass123" },
  { name: "Siddharth Sen", sem: 6, EnrNmber: "ENR047", skills: "DevOps", email: "siddharth@example.com", password: "pass123" },
  { name: "Tarun Vyas", sem: 5, EnrNmber: "ENR048", skills: "DevOps", email: "tarun@example.com", password: "pass123" },
  { name: "Anusha Mishra", sem: 7, EnrNmber: "ENR049", skills: "DevOps", email: "anusha@example.com", password: "pass123" },
  { name: "Omkar Kulkarni", sem: 8, EnrNmber: "ENR050", skills: "DevOps", email: "omkar@example.com", password: "pass123" },
  { name: "Neeraj Chauhan", sem: 2, EnrNmber: "ENR051", skills: "DevOps", email: "neeraj@example.com", password: "pass123" },

  // Game Development (6)
  { name: "Reema Paul", sem: 6, EnrNmber: "ENR052", skills: "Game Development", email: "reema@example.com", password: "pass123" },
  { name: "Arnav Goel", sem: 5, EnrNmber: "ENR053", skills: "Game Development", email: "arnav@example.com", password: "pass123" },
  { name: "Tanmay Dubey", sem: 4, EnrNmber: "ENR054", skills: "Game Development", email: "tanmay@example.com", password: "pass123" },
  { name: "Pallavi Seth", sem: 2, EnrNmber: "ENR055", skills: "Game Development", email: "pallavi@example.com", password: "pass123" },
  { name: "Sameer Qureshi", sem: 1, EnrNmber: "ENR056", skills: "Game Development", email: "sameer@example.com", password: "pass123" },
  { name: "Vaibhav Rawat", sem: 8, EnrNmber: "ENR057", skills: "Game Development", email: "vaibhav@example.com", password: "pass123" },

  // Blockchain Technology (7)
  { name: "Mehul Agarwal", sem: 3, EnrNmber: "ENR058", skills: "Blockchain Technology", email: "mehul@example.com", password: "pass123" },
  { name: "Ila Chaudhary", sem: 6, EnrNmber: "ENR059", skills: "Blockchain Technology", email: "ila@example.com", password: "pass123" },
  { name: "Parth Shah", sem: 5, EnrNmber: "ENR060", skills: "Blockchain Technology", email: "parth@example.com", password: "pass123" },
  { name: "Jaya Mishra", sem: 2, EnrNmber: "ENR061", skills: "Blockchain Technology", email: "jaya@example.com", password: "pass123" },
  { name: "Devansh Chopra", sem: 7, EnrNmber: "ENR062", skills: "Blockchain Technology", email: "devansh@example.com", password: "pass123" },
  { name: "Khushi Rana", sem: 4, EnrNmber: "ENR063", skills: "Blockchain Technology", email: "khushi@example.com", password: "pass123" },
  { name: "Ishan Gulati", sem: 1, EnrNmber: "ENR064", skills: "Blockchain Technology", email: "ishang@example.com", password: "pass123" },

  // Artificial Intelligence (6)
  { name: "Manan Jain", sem: 4, EnrNmber: "ENR065", skills: "Artificial Intelligence", email: "manan@example.com", password: "pass123" },
  { name: "Charvi Taneja", sem: 3, EnrNmber: "ENR066", skills: "Artificial Intelligence", email: "charvi@example.com", password: "pass123" },
  { name: "Shubham Dey", sem: 6, EnrNmber: "ENR067", skills: "Artificial Intelligence", email: "shubham@example.com", password: "pass123" },
  { name: "Nandini Rao", sem: 2, EnrNmber: "ENR068", skills: "Artificial Intelligence", email: "nandini@example.com", password: "pass123" },
  { name: "Viraj Solanki", sem: 7, EnrNmber: "ENR069", skills: "Artificial Intelligence", email: "viraj@example.com", password: "pass123" },
  { name: "Tara Singh", sem: 5, EnrNmber: "ENR070", skills: "Artificial Intelligence", email: "tara@example.com", password: "pass123" },

  // Internet of Things (IoT) (6)
  { name: "Deepak Bansal", sem: 5, EnrNmber: "ENR071", skills: "Internet of Things (IoT)", email: "deepak@example.com", password: "pass123" },
  { name: "Rashi Mahajan", sem: 6, EnrNmber: "ENR072", skills: "Internet of Things (IoT)", email: "rashi@example.com", password: "pass123" },
  { name: "Ujjwal Srivastava", sem: 7, EnrNmber: "ENR073", skills: "Internet of Things (IoT)", email: "ujjwal@example.com", password: "pass123" },
  { name: "Zara Khan", sem: 4, EnrNmber: "ENR074", skills: "Internet of Things (IoT)", email: "zara@example.com", password: "pass123" },
  { name: "Kabir Joshi", sem: 3, EnrNmber: "ENR075", skills: "Internet of Things (IoT)", email: "kabir@example.com", password: "pass123" },
  { name: "Payal Dubey", sem: 1, EnrNmber: "ENR076", skills: "Internet of Things (IoT)", email: "payal@example.com", password: "pass123" }
];

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
  "Internet of Things (IoT)"
];


module.exports.showSkillCards = async (req, res) => {
  try {
    const skills = await User.distinct('skills');
    res.render('index', { skills });
  } catch (error) {
    console.error('Error loading skills:', error);
    res.status(500).send("Server error");
  }
};

module.exports.getUsersBySkill = async (req, res) => {
  const skill = req.params.name;
  const matchedUsers = users.filter(user => user.skills === skill);
  res.render("showSkillCards", { skill, users: matchedUsers });
};