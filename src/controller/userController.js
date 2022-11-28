const userModel = require('../models/userModel')
const validName=function(name){
    const nameRegex=/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z])$/
    return nameRegex.test(name)
}
const validEmail=function(email){
    // const emailRegex=/\S+@\S+\.\S+/
     const emailRegex=/^[\w-\.]+@([\w-]+\.)+[\w-][a-z]{1,4}$/
    return emailRegex.test(email)
}
const validMobile=function(mobile){
    const mobileRegex=/^\d{10}$/
    return mobileRegex.test(mobile)
}

const createUser = async function(req,res){
    try{

         const data = req.body

         if(Object.keys(data).length == 0){
            return res.status(500).send({status:false,message:"Request Body Can't be Empty"})
         }
         const {title,name,phone,email,password} = data;

          // Checking  titles

         if(!title){
            return res.status(400).send({status:false,message:"title is required"})
         }
         if(title != "Mr" && title !="Mrs" && title != "Miss"){
            return res.status(400).send({status:false,message:"title can only be Mr,Mrs,Miss"})
        }  
          // Checking  name
        
        if(!name){
            return res.status(400).send({status:false,message:"name is required"})
        }
        if(!isValidName(name)){
            return res.status(400).send({status:false,message:"name is only accepted in alphabet"})
        }
        //checking phone
        if(!phone){
            return res.status(400).send({status:false,message:"phone number is required"})
        }
        if(!validMobile(phone)){
            return res.status(400).send({status:false,message:"phone number is invalid"})  
        }

        const phoneRegistered = await userModel.findOne({phone:phone});
        if(phoneRegistered){
            return res.status(400).send({status:false,message:"phone number is already registered"})
        }
        //checking email
         if(!email){
             return res.status(400).send({status:false,message:"email is required"})
         }
         if(!validEmail(email)){
            return res.status(400).send({status:false,message:"email is invalid"})
         }

         const emailRegistered = await userModel.findOne({email:email});
         if(emailRegistered){
            return res.status(400).send({status:false,message:"email is already Registered"})
         }
        //checking password 

        if(!password){
            return res.status(400).send({status:false,message:"password is required"})
        }
        if(!(password.length >=8 && password.length <=15)){
            return res.status(400).send({status:false,message:"password is only accept between 8 to 15"})
        }
    }
    catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}