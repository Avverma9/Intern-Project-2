const BookModel = require("../controller/bookController");
const UserModel = require("../controller/userController");
const ReviewModel = require("../controller/reviewController");
const multer = require ("multer");
const {valid,validEmail,validISBN,validMobile,validReleasedAt} = require("../validator/validation");
const bookModel = require("../models/bookModel");

const createBook = async function (req,res){
    try{
        const data = req.body
        const{title,excerpt,userId,ISBN,category,subcategory,releasedAt} = data
        if(Object.keys(data)==0){ return res.status(400).send({ status : false, msg : 'Please provide data'})}

        if(!valid(title)){ return res.status(400).send({ status : true, msg :"title is required"})}
        //if(!(title == "Mr" || title == "Mrs" || title == "Miss")) { return res.status(400).send({status : false, msg : "title should be valid"})}

        const duplicateTitle = await bookModel.findOne({title :title})
        if (duplicateTitle) { return res.status(400).send({ status : false, msg : "title is already registered"})}

        if(!valid(excerpt)){ return res.status(400).send({status: false , msg : "excerpt is required"})}

        if(!valid(userId)){return res.status(400).send({ status : false, msg : "Please enter the user Id"})}
        if(!isValidObjectId(userId)){ return res.status(400).send({status : false, msg : " it's not a valid user Id"})}

        if(!valid(ISBN)){ return res.status(400).send({ status : false , msg : " Please enter ISBN number"})}
        if(!validISBN(ISBN)){ return res.status(400).send({ status : false , msg : " Please Enter the Valid ISBN"})}

        const duplicateISBN = await bookModel.findOne({ISBN : ISBN})
        if (duplicateISBN) { return res.status(400).send({ status : false, msg : "ISBN is already available"})}

        if(!valid(category)){ return res.status(400).send({status: false , msg : "category is required"})}

        if(!valid(subcategory)){ return res.status(400).send({status: false , msg : "subcatogory is required"})}

        if(!validReleasedAt(releasedAt)){ return res.status(400).send({status : false, msg : "release date should be in valid format"})}
    
        const newBookData = await BookModel.create(data)
        return res.status(201).send({ status : true , data : newBookData})
    
    
    }
 catch(err){
    console.log(err)
    return res.status(500).send({ message : err.message})
 }


}
module.exports.createBook=createBook