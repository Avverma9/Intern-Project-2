const { Router } = require('express');
const express = require('express');
const router = express.Router();
const CollegeController = require('../controllers/collegeController')
const InternController = require('../controllers/internController')

router.post("/functionup/colleges" ,CollegeController.createcollege)
router.get("/functionup/collegeDetails",CollegeController.collegeDetails)
router.post("/functionup/interns",InternController.createInterns)


module.exports = router;

