const express = require('express')
const router = express.Router()
const {getaccounts,
    getaccount,
    updateaccount} = require('../controllers/doctorcontroller')

router.get('/', getaccounts)

router.get('/:id', getaccount) 

// router.post('/', createnewaccount)

// router.delete('/:id',delaccount)

router.patch('/:id',updateaccount)
module.exports = router