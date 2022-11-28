const express = require('express')
const router = express.Router();

const userController = require('../controller/userController')
const bookController = require('../controller/bookController')
const reviewController = require('../controller/reviewController')
const middleWare = require('../middleware/auth')

router.post('/register',userController.createUser)
router.post('/login',userController.login)
router.post('/book',middleWare.authenticate,bookController.createBook)
router.get('/books',middleWare.authenticate,bookController.getBooks)







router.all('/*',function(req,res){
    return res.status(400).send({status:false,message:"invalid http request"})
})
module.exports = router