const mongoose =require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const bookSchema = new mongoose.Schema({
    title :{
        type : String,
        required : true,
        unique : true,

    },
    excerpt : {
        type : String,
        required : true,
    },
    bookCover : {
        type : String
    },
    userId : {
        type : ObjectId,
        ref : "User",
    },
    ISBN : {
        type : String,
        unique :true,
        required : true,
    },
    category : {
        type : String,
        required : true,
    },
    subcategory : {
        type : [String],
        required : true
    },
    isDeleted : {
        type : Boolean,
        default :false
    },
    deletedAt:{
     type : Date
    },
    reviews : {
        type : Number,
        default :0,
    },
    releasedAt : {
        type : Date,
        required : true
    }
 }, {timestamps: true})

    module.exports = mongoose.model("bookManagement",bookSchema);