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
        let data = req.body;
        const { name, fullName, logoLink } = data;
        if (Object.keys(data) == 0) return res.status(400).send({ status: false, msg: "NO data provided" })
        if (!isValid(name)) { return res.status(400).send({status: false, msg:"Name is required"}) }
        if (!isValidname(name)) { return res.status(400).send({status: false, msg:"Name is not valid"}) }
        
        let duplicateName= await CollegeModels.findOne({name:name})
        if(duplicateName){ return res.status(400).send({status: false, msg: "Can't create new college. College name already exist"})}

        if (!isValid(fullName)) { return res.status(400).send({status:false, msg: "Full name is required"}) }
        if (!isValid(logoLink)) { return res.status(400).send({status:false, msg:"Logo is required"}) }

        if (!isValidLogoLink(logoLink)) { return res.status(400).send({status:false, msg:"Logolink is invalid"}) }
        const newCollege = await CollegeModels.create(data);
        return res.status(201).send({ status: true, msg: newCollege })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ msg: error.message })
    }
}


//==========================================================
const collegeDetails = async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin','*')
    try {
        const collegeName = req.query.collegeName;
        //----------------college Name-------------------------------------
        if (!collegeName) {
            return res.status(400).send({ status: false, message: "Please provide college name" });
        }
        //--------------finding the colllege Detail-------------------------
        const collegeDetails = await CollegeModels.findOne({ name: collegeName });
        if (!collegeDetails) {
            return res.status(400).send({ status: false, message: "No college appears with this college name" });
        }
        //----------------find intern data-----------------------------------
        const interns = await InternModels.find({ collegeId: collegeDetails._id });
        if (interns.length == 0) {
            const college = {
                name: collegeDetails.name,
                fullName: collegeDetails.fullName,
                logoLink: collegeDetails.logoLink,
                interns: "No interns applied for internship at this college"
            }
            return res.status(200).send({ status: true, data: college });
        }
        else {
            const college = {
                name: collegeDetails.name,
                fullName: collegeDetails.fullName,
                logoLink: collegeDetails.logoLink,
                interns: interns
            }
            return res.status(200).send({ status: true, data: college });
        }

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};
module.exports.createcollege=createcollege
module.exports.collegeDetails=collegeDetails