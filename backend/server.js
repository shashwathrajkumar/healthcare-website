require('dotenv').config()
const express = require("express");
const patientrouter = require('./routes/patients')
const doctorrouter = require('./routes/doctors')
const mongoose = require('mongoose')
const app = express() 

app.use(express.json()) 
app.use((req,res,next) => { 
    console.log(req.path, req.method)
    next()  
})

app.use('/patient',patientrouter)
app.use('/doctor',doctorrouter)

mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(process.env.PORT,()=>{
            console.log("listening on",process.env.PORT);
        });        
    })
    .catch((error)=>{
        console.log(error)
    })




