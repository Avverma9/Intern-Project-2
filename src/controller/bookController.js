
const UserModel = require("../controller/userController");
const ReviewModel = require("../controller/reviewController");


const {valid,validEmail,validISBN,validMobile,validReleasedAt} = require("../validator/validation");
const bookModel = require("../models/bookModel");
const { isValidObjectId } = require("mongoose");

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
    
        const newBookData = await bookModel.create(data)
        return res.status(201).send({ status : true , data : newBookData})
    
    
    }
 catch(err){
    console.log(err)
    return res.status(500).send({ message : err.message})
 }


}
module.exports.createBook=createBook

const getBooks = async function(req,res){
    try{

         const data = req.query;
         const{userId,category,subcategory} = data

         const filterData = {isDeleted:false}

        if (Object.keys(data).length == 0) {
            let getAllBooks = await bookModel.find(filterData).sort({ title: 1 }).select({_id:1, title:1, excerpt:1, userId:1, category:1, subcategory:1, releasedAt:1, reviews:1})
            return res.status(200).send({ status: true, message: 'Books list', data: getAllBooks })
        }

        if (userId) {
            let isValidId = mongoose.Types.ObjectId.isValid(userId)
            if (!isValidId) {
                return res.status(400).send({ status: false, message: "Enter valid user id" })
            }
             filterData.userId = userId
        }
        if (category) {
            filterData.category = category
        }
        if (subcategory) {
            filterData.subcategory = subcategory
        }

        let books = await bookModel.find(filterData).sort({ title: 1 }).select({_id:1, title:1, excerpt:1, userId:1, category:1, subcategory:1, releasedAt:1, reviews:1})
        if (books.length == 0) {
            return res.status(404).send({ status: false, message: "No data found" })
        }
    
    
            return res.status(200).send({ status: true, message: 'Books list', data: books })
        


    }
    catch(err){
        console.log(err)
    return res.status(500).send({status:false, message : err.message})
    }
}

module.exports.getBooks = getBooks;