// scholarshipModel.js
const mongoose = require('mongoose');

const scholarshipSchema = new mongoose.Schema({
    name: { type: String, required: true },
    college: { type: String, required: true },
    marks: { type: Number, required: true },
    year: { type: String, required: true },
    photo: { type: String, required: true } // Store image as a URL
});

const Scholarship = mongoose.model('Scholarship', scholarshipSchema);
module.exports = Scholarship;
