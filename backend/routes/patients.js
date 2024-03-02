const express = require('express')
const router = express.Router()
const { 
    createnewcustomer,
    getcustomers,
    getcustomer,
    delcustomer,
    updatecustomer
} = require('../controllers/patientcontroller')
 
router.get('/', getcustomers)

router.get('/:id', getcustomer)

router.post('/', createnewcustomer)

router.delete('/:id',delcustomer)

router.patch('/:id',updatecustomer)
module.exports = router