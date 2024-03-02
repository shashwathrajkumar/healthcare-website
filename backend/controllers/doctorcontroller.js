const Account = require('../models/hospitalmodel.js')
const mongoose = require('mongoose') 

const getaccounts = async (req,res) => { 
    const accounts = await Account.find({})
    res.status(200).json(accounts)
}

const getaccount = async(req,res) => {
    const {id}  = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Invalid ID'})
    }
    const account = await Account.findById(id)

    if(!account){
        return res.status(404).json({error: 'No such customer found'})
    }
    res.status(200).json(account)
}

const updateaccount = async (req,res) => {
    const {id}  = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Invalid ID'})
    }

    const account = await Account.findOneAndUpdate({_id:id},{
        ...req.body
    })
    if(!account){
        return res.status(400).json({error: "Not found"})
    }
    res.status(200).json(account)
}
module.exports = {getaccounts,getaccount,updateaccount}