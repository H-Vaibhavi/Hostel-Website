const mongoose = require('mongoose');

const hostelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    c_password: {type: String, required:true}
});

const hostelModel = mongoose.model("hostels", hostelSchema);
module.exports = hostelModel;
