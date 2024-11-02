const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const multer = require('multer'); // For handling file uploads
const path = require('path');
const hostelModel = require('./models/hostel');
const Scholarship = require('./models/scholarshipModel'); // Import the scholarship model

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Allow multiple origins
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5175'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ["POST"],
    credentials: true
}));

// Set up multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, 'uploads'); // Ensure this path is correct
        cb(null, uploadPath); // Folder to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`); // Add a timestamp to the filename
    }
});

const upload = multer({ storage });

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/hostel")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("MongoDB connection error: ", err));

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Use hardcoded credentials for testing
    if (email === "sanjay@gmail.com" && password === "password123") {
        return res.status(200).json({ message: "Success" });
    }

    return res.status(401).json({ message: "Invalid login credentials" });
});


app.post('/register', async (req, res) => {
    const { name, email, password, c_password } = req.body;

    // Check if passwords match
    if (password !== c_password) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    // Check if the user already exists
    const existingUser = await hostelModel.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: "User with this email already exists" });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user and save to the database
        const newUser = new hostelModel({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Error registering user" });
    }
});


// Scholarship submission route
app.post('/scholarship', upload.single('photo'), async (req, res) => {
    const { name, college, marks, year } = req.body;
    const photo = req.file ? req.file.path : null;  // Safely handle the photo

    console.log("Request Body:", req.body);  // Log form data to check
    console.log("Uploaded File:", req.file);  // Log file details to verify it's being received

    if (!photo) {
        return res.status(400).send("Photo is required");  // Return error if no file uploaded
    }

    try {
        const newScholarship = new Scholarship({ name, college, marks, year, photo });
        await newScholarship.save();
        res.status(201).send("Scholarship application submitted successfully.");
    } catch (error) {
        console.error("Error saving scholarship application:", error);
        res.status(500).send("Error saving application.");
    }
});
// Fetch all scholarship applications
app.get('/scholarships', async (req, res) => {
    try {
        const scholarships = await Scholarship.find(); // Fetch all scholarship entries
        res.status(200).json(scholarships);
    } catch (error) {
        console.error("Error fetching scholarships:", error);
        res.status(500).send("Error fetching scholarships.");
    }
});

// Start the server
const port = 3001;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
