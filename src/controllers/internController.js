const mongoose = require("mongoose");
const InternModel = require("../models/internModel");
const CollegeModel = require("../models/collegeModel");
const { isValidObjectId } = require("mongoose");
const { isValidemail, isValidmobile } = require("../validator/validator");

const isValid = function (value) {
  if (typeof value === undefined || typeof value === null) {return false;}
  if (typeof value === "string" && value.length > 0) { return true;}
};

const createInterns = async function (req, res) {
  try {
    res.header('Access-Control-Allow-Origin','*')
    let data = req.body;
    const { name, email, mobile, collegeName } = data;
    
    if (Object.keys(data).length == 0)
      return res.status(400).send({ status: false, msg: "No data provided" });

    if(!isValid(collegeName)){return res.status(400).send({status:false,msg:"collegeName is required"})}

    if (!isValid(name)) { return res.status(400).send({ status: false, msg: "Name is required or it should be valid" });}

    if (!email) {return res.status(400).send({ status: false, msg: "Email id is required" }); }
    if (!isValidemail(email)) {return res.status(400).send({ status: false,msg: "Email is required or it should be valid", });}

    let duplicateEmail = await InternModel.findOne({ email: email });
    if (duplicateEmail) {return res.status(400).send({ status: false, msg: "Email already exist" });}

    if (!mobile) {return res.status(400).send({ status: false, msg: "Mobile is required" }); }
    if (!isValidmobile(mobile)) {return res.status(400).send({ status: false, msg: "Please enter a valid mobile number" });}

    let duplicateMobile = await InternModel.findOne({ mobile: mobile });
    if (duplicateMobile) {return res.status(400).send({ status: false, msg: "Mobile number already exist" });}
    
    const isMatch = await CollegeModel.findOne({ name: collegeName });
    if (!isMatch) {return res.status(400).send({ status: false, msg: "please enter a valid college Name" });}
    data.collegeId = isMatch._id;

    const newIntern = await InternModel.create(data);
     res.status(201).send({ status: true, msg: newIntern });

   } catch (error) {
    console.log(error);
     res.status(500).send({status:false, msg: error.message });
  }
};

module.exports.createInterns = createInterns;
