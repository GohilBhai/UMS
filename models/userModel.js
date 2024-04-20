const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },mobile:{
        type:String,
        required:true
    },image:{
        type:String,
        required:true
    },admin:{
        type:Number,
        required:true
    },varify:{
        type:Number,
        default:0
    }
});

module.exports = mongoose.model('Ums',userSchema);