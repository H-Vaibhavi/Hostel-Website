const mongoose = require('mongoose');

const scholarshipSchema = new mongoose.Schema({
    name: { type: String, required: true },
    college: { type: String, required: true },
    marks: { type: Number, required: true },
    year: { type: String, required: true },
    photo: { type: String, required: true },
    casteCertificate: { type: String, required: true },
    incomeCertificate: { type: String, required: true },
    marksheet: { type: String, required: true }
});

const Scholarship = mongoose.model('scholarships', scholarshipSchema);
module.exports = Scholarship;
