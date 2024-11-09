const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const Scholarship = require('./models/scholarshipModel');
const Razorpay = require('razorpay');  // Make sure Razorpay module is required

const app = express();

// Middleware for body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS Configuration
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5175'];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            return callback(new Error('Not allowed by CORS'), false);
        }
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Use hardcoded credentials for testing
    if (email === "sanjay@gmail.com" && password === "password123") {
        return res.status(200).json({ message: "Success" });
    }

    return res.status(401).json({ message: "Invalid login credentials" });
});

// Register route
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

// Set up multer for handling multiple file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadPath = path.join(__dirname, 'uploads');
        if (file.fieldname === 'photo') uploadPath = path.join(uploadPath, 'photos');
        else if (file.fieldname === 'casteCertificate') uploadPath = path.join(uploadPath, 'casteCertificates');
        else if (file.fieldname === 'incomeCertificate') uploadPath = path.join(uploadPath, 'incomeCertificates');
        else if (file.fieldname === 'marksheet') uploadPath = path.join(uploadPath, 'marksheets');
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }
});

// Serve static files from the "uploads" folder for direct access to images and documents
app.use('/uploads', express.static(path.join(__dirname, 'uploads')), (req, res, next) => {
    console.log('File accessed:', req.url);
    next();
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hostel', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Scholarship submission route with multiple file fields
app.post('/scholarship', upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'casteCertificate', maxCount: 1 },
    { name: 'incomeCertificate', maxCount: 1 },
    { name: 'marksheet', maxCount: 1 }
]), async (req, res) => {
    const { name, college, marks, year } = req.body;
    const files = req.files;

    console.log("Request body:", req.body);
    console.log("Uploaded files:", req.files);

    if (!files.photo || !files.casteCertificate || !files.incomeCertificate || !files.marksheet) {
        return res.status(400).send("All documents (photo, caste, income, and marksheet) are required.");
    }

    try {
        // Save only the relative path from /uploads
        const newScholarship = new Scholarship({
            name,
            college,
            marks,
            year,
            photo: `uploads/photos/${files.photo[0].filename}`,
            casteCertificate: `uploads/casteCertificates/${files.casteCertificate[0].filename}`,
            incomeCertificate: `uploads/incomeCertificates/${files.incomeCertificate[0].filename}`,
            marksheet: `uploads/marksheets/${files.marksheet[0].filename}`
        });

        await newScholarship.save();
        res.status(201).send("Scholarship application submitted successfully.");
    } catch (error) {
        console.error("Error saving scholarship application:", error.message);
        res.status(500).send(`Error saving application: ${error.message}`);
    }
});

// Fetch all scholarship applications
app.get('/scholarships', async (req, res) => {
    try {
        const scholarships = await Scholarship.find();
        res.status(200).json(scholarships);
    } catch (error) {
        console.error("Error fetching scholarships:", error);
        res.status(500).send("Error fetching scholarships.");
    }
});

// Razorpay Setup
const razorpay = new Razorpay({
    key_id: 'rzp_test_TtA2LqaIHN7X2I',  // Your Razorpay Key ID
    key_secret: '4h4VETyxgb9JXixtC11VEkJq',  // Your Razorpay Secret Key
});

// Razorpay Order Creation Route
app.post('/create-order', async (req, res) => {
    const { amount } = req.body;

    // Create Razorpay order
    const options = {
        amount: amount * 100, // Convert to paise (smallest currency unit)
        currency: 'INR',
        receipt: `receipt_${new Date().getTime()}`, // Corrected: use backticks for template literals
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json({ id: order.id, amount: order.amount });
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
const port = 3001;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
