const mongoose = require('mongoose');

const contactScheme = new mongoose.Schema({
    ename: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    date1: {
        type: Date,
        required: true
    },
    date2: {
        type: Date,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

const Contact = mongoose.model('Contact', contactScheme);

module.exports = Contact;