const mongoose = require('mongoose')

const Schema = mongoose.Schema
const hospitalschema = new Schema({
    Name: {
        type: String,
        required: true
    }, 
    Hospital_ID: {
        type: Number,
        required: true
    },
    Doctor_ID: {
        type: Number,
        required: true
    },
    Doctor_Name: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Hospital', hospitalschema)