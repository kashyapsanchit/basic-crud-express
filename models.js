const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({

    name: String,
    email: {
        type: String,
        required: true,
        unique: true,  
        index: true
    },
    phone: String

}, { timestamps: true});

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact