const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcrypt");
const Razorpay = require("razorpay");

// Import Models
const Scholarship = require("./models/scholarshipModel");
const hostelModel = require("./models/hostel");
const contactModel = require("./models/Contact");

const app = express();

// Middleware for body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS Configuration
const allowedOrigins = ["http://localhost:5173", "http://localhost:5175"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("Not allowed by CORS"), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Static file serving for uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/hostel", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await hostelModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid login credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid login credentials" });
    }

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Register Route
app.post("/register", async (req, res) => {
  const { name, email, password, c_password } = req.body;

  if (password !== c_password) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  const existingUser = await hostelModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "User with this email already exists" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new hostelModel({
      name,
      email,
      password: hashedPassword,
      c_password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Error registering user" });
  }
});

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = path.join(__dirname, "uploads");
    if (file.fieldname === "photo") uploadPath = path.join(uploadPath, "photos");
    else if (file.fieldname === "casteCertificate")
      uploadPath = path.join(uploadPath, "casteCertificates");
    else if (file.fieldname === "incomeCertificate")
      uploadPath = path.join(uploadPath, "incomeCertificates");
    else if (file.fieldname === "marksheet")
      uploadPath = path.join(uploadPath, "marksheets");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// Scholarship Submission
app.post(
  "/scholarship",
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "casteCertificate", maxCount: 1 },
    { name: "incomeCertificate", maxCount: 1 },
    { name: "marksheet", maxCount: 1 },
  ]),
  async (req, res) => {
    const { name, college, marks, year } = req.body;
    const files = req.files;

    if (!files.photo || !files.casteCertificate || !files.incomeCertificate || !files.marksheet) {
      return res.status(400).send("All documents are required.");
    }

    try {
      const newScholarship = new Scholarship({
        name,
        college,
        marks,
        year,
        photo: `uploads/photos/${files.photo[0].filename}`,
        casteCertificate: `uploads/casteCertificates/${files.casteCertificate[0].filename}`,
        incomeCertificate: `uploads/incomeCertificates/${files.incomeCertificate[0].filename}`,
        marksheet: `uploads/marksheets/${files.marksheet[0].filename}`,
      });

      await newScholarship.save();
      res.status(201).send("Scholarship application submitted successfully.");
    } catch (error) {
      console.error("Error saving scholarship application:", error.message);
      res.status(500).send(`Error saving application: ${error.message}`);
    }
  }
);

// Fetch all Scholarships
app.get("/scholarships", async (req, res) => {
  try {
    const scholarships = await Scholarship.find();
    res.status(200).json(scholarships);
  } catch (error) {
    console.error("Error fetching scholarships:", error);
    res.status(500).send("Error fetching scholarships.");
  }
});
app.get("/contacts", async (req, res) => {
    try {
      const contacts = await contactModel.find();
      res.status(200).json(contacts);
    } catch (error) {
      console.error("Error fetching contact data:", error);
      res.status(500).send("Error fetching responses.");
    }
  });
  app.get("/hostels", async (req, res) => {
    try {
      const hostels = await hostelModel.find();
      res.status(200).json(hostels);
    } catch (error) {
      console.error("Error fetching registered students data:", error);
      res.status(500).send("Error fetching registered students data.");
    }
  });
// Contact Form Submission
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = new contactModel({ name, email, message });
    await newContact.save();
    res.status(200).json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({ message: "Failed to submit form." });
  }
});

// Razorpay Setup
const razorpay = new Razorpay({
  key_id: "rzp_test_TtA2LqaIHN7X2I",
  key_secret: "4h4VETyxgb9JXixtC11VEkJq",
});

app.post("/create-order", async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: `receipt_${new Date().getTime()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json({ id: order.id, amount: order.amount });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
