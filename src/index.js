const express = require("express");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const route = require("./routes/route.js");
const multer = require('multer');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().any())
mongoose
  .connect(
    "mongodb+srv://Avverma:Avverma95766@avverma.2g4orpk.mongodb.net/group15Database?retryWrites=true&w=majority"
    ,
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

app.use("/", route);

app.listen(process.env.PORT || 3001, function () {
  console.log("Express app running on port " + (process.env.PORT || 3001));
});
