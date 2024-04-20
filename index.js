//Database Connection 

const mongoose = require('mongoose');
const URL = "mongodb://127.0.0.1:27017/ums";
mongoose.connect(URL)
.then(()=>{
    console.log("Database Connected Successfully");
}).catch((err)=>{
    console.log(err, "Database Connection Failed...");
});

//Server Createtion

const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

const router = require('./routes/userRoute.js');
const app = express();
app.use(express.json());
// app.use(cors());
// app.use(bodyParser.urlencoded({extended:true}));
app.use('/', router);
app.listen(PORT, ()=>{
    console.log(`Server Start At Port ${PORT}`);
})