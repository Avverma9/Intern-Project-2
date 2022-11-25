const mongoose = require('mongoose')
const CollegeModels = require('../models/collegeModel')
const InternModels = require('../models/internModel')
const {isValidLogoLink, isValidname}= require('../validator/validator')
//==================================validator==============================================================//

const isValid = function (value) {
    if (typeof (value) === undefined ||typeof (value) === null) { return false }
    if (typeof (value) === "string" && (value).length > 0) { return true }
}
//==========================================createCollege==========================================//
const createcollege = async function (req, res) {
    try {
        const data = req.body;
        const { name, fullName, logoLink } = data;
        if (Object.keys(data) == 0) return res.status(400).send({ status: false, msg: "NO data provided" })
        if (!isValid(name)) { return res.status(400).send({status: false, msg:"Name is required"}) }
        if (!isValidname(name)) { return res.status(400).send({status: false, msg:"Name is not valid"}) }
         
        let duplicateName= await CollegeModels.findOne({name:name})
        if(duplicateName){ return res.status(400).send({status: false, msg: "Can't create new college. College name already exist"})}
        
        if (!isValid(fullName)) { return res.status(400).send({status:false, msg: "Full name is required"})}
        if (!isValid(logoLink)) { return res.status(400).send({status:false, msg:"Logo is required"}) }
        
        if (!isValidLogoLink(logoLink)) { return res.status(400).send({status:false, msg:"Logolink is invalid"})}
        const newCollege = await CollegeModels.create(data);
        res.status(201).send({ status: true, data: newCollege })
    }
    catch (error) {
        console.log(error)
         res.status(500).send({status:false, msg: error.message })
    }
}

//==========================================getColleges==========================================//

//==========================================================
const getColleges = async function (req, res) {
    try {
        let collegeName = req.query.collegeName
        if (!collegeName) { return res.status(400).send({status: false, msg:"College name is required"}) }
        let collegeId = await CollegeModels.find({ name: collegeName  }).select({ _id: 1 })
        if (collegeId.length==0) {return res.status(404).send({status:false, msg:"Please enter a valid collegeName abbreviation in lowercase"})}
        let interns = await InternModels.find({ collegeId: collegeId }).select({ name: 1, email: 1, mobile: 1, _id: 1 })
        let result = await CollegeModels.findOne({ name: collegeName}).select({ name: 1, fullName: 1, logoLink: 1, _id: 0 })

        const obj = {
            name: result.name,
            fullName: result.fullName,
            logoLink: result.logoLink,
            interests: interns
        }
        return res.status(200).send({ status: true, data: obj })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ msg: error.message })
    }
}

module.exports.createcollege=createcollege
module.exports.getColleges=getColleges