const express = require('express');
const bodyParser = require('body-parser');
const route = require("./routes/route");
const { default : mongoose} = require ("mongoose");

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended :true}));

mongoose.connect("mongodb+srv://Avverma:Avverma95766@avverma.2g4orpk.mongodb.net/group16Database?retryWrites=true&w=majority",
 {
    useNewUrlParser : true
 }
)
.then(() => console.log("MongoDB is connected"))
.catch((err)=>console.log(err));


app.use ("/", route);

app.listen(process.env.PORT || 3000 , function(){
    console.log("Express is running on Port" + (process.env.PORT || 3000))
});