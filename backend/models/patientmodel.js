const mongoose = require('mongoose')

const Schema = mongoose.Schema
const patientschema = new Schema({
    Patient_Name: {
        type: String,
        required: true
    },  
    Patient_ID: {
        type: Number,
        required: true
    },
    Gender: {
        type: String,
        required: true
    },
    Age: {
        type: Number,
        required: true
    },
    Blood_Group: {
        type: String,
        required: true
    },
    Height: {
        type: Number,
        required: true
    },
    Weight: {
        type: Number, 
        required: true
    },
    Diabetic: {
        type: String,
        required: true
    },
    Cholestrol: {
        type: Number,
        required: true
    },
    Description: {
        type: [{
            complication: String,
            prescription: String
        }],
        default: [] 
    }

}, {timestamps: true})

module.exports = mongoose.model('Patient', patientschema)