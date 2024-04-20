const Model = require('../models/userModel.js');

//send email ✔✔
const nodemailer = require('nodemailer');
 const sendmail = async(name,email,user_id)=>{
    try {
        const transporter = nodemailer.createTransport({
            host:"smtp.gmail.com",
            port:587,
            secure:false,
            requireTLS:true,
            auth:{
                user:"rdgohil2002@gmail.com",
                pass:"silfkeqrfemakdgz"
            }
        });

        const mailOptions ={
            from:'rdgohil2002@gmail.com',
            to:email,
            subject:'Account Verification',
            html:"<p>Hi "+name+", Please click Here to <a href='http://127.0.0.1:5000/varifymail?id="+user_id+"'>varify</a> mail</p>"
        }

        transporter.sendMail(mailOptions,(err,info)=>{
               if(err) {
                console.log(err);
               }else{
                console.log("Email Sent Your mail", + info.response);
               }
        })
    } catch (error) {
        console.log(error.message);
    }
 }

//varify mail 

const varifymail = async(req,res)=>{
    try {
     const vm = await Model.updateOne({_id:req.query.id},{$set:{varify:1}});
     console.log(vm);
     res.render("varifymail");//path se ela varifymail page no bhulvanu nathi...
    } catch (error) {
        console.log(error);
    }
}


//password hashing ✔✔
const bcrypt = require('bcrypt');
const securePassword = async(password)=>{
try {
    const spwd = await bcrypt.hash(password,10);
    return spwd;
} catch (error) {
    console.log(error.message);
}
}

const loadRegister = async(req,res) =>{
    try{
        res.render('register'); // path se register page no
    }catch(err){
        console.log(err.message);

    }
}

// Register page ma Submit button per click karya pasi su thay tena mate se...
//  Insert User mate se...

// const insertUser = async(req,res)=>{
//     try{

//         const spassword = await securePassword(req.body.password);
//          const user = new Model({   name:req.body.name, 
//                                     email:req.body.email, 
//                                     password:spassword, 
//                                     mobile:req.body.mobile, 
//                                     image:req.file.filename, 
//                                     admin:0,
//                                 });

//          const userData = await user.save();
//          if(userData){
//             // email sending method
//             sendmail(req.body.name, req.body.email, userData._id);
//             res.render('register', {message:"Registration Has Been Successfully😀😀..., Please Varify Yor Mail"});
//          }else{
//            res.render('register', {message:"Registration Has Been Failed😡😡..."});
//          }

//     }catch(err){
//         console.log(err.message);
//     }
// }


const insertUser = async (req, res) => {
    try {
        const existingUser = await Model.findOne({ email: req.body.email });
        if (existingUser) {
            return res.render('register', { message: "Email already taken. Please choose a different email." });
        }

        const spassword = await securePassword(req.body.password);
        const user = new Model({
            name: req.body.name,
            email: req.body.email,
            password:spassword, // Note: You may want to encrypt the password before saving ==> req.body.password
            mobile: req.body.mobile,
            image: req.file.filename,
            admin: 0,
        });

        const userData = await user.save();
        if (userData) {
            // email sending method
            sendmail(req.body.name, req.body.email, userData._id);
            res.render('register', { message: "Registration has been successful😀😀. Please verify your email." });
        } else {
            res.render('register', { message: "Registration has failed😡😡." });
        }

    } catch (err) {
        console.log(err.message);
        res.render('register', { message: "An error occurred. Please try again later." });
    }
}

//loadLogin 
const loadLogin = async(req,res)=>{
    try{
       res.render('login');
    }catch(err){
        console.log(err.message);
    }
}

//loginvarify
const loginvarify = async(req,res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;

        const userData = await Model.findOne({email:email});

        if(userData){
            const matchpassword =  bcrypt.compare(password,userData.password);
            if(matchpassword){
                  if(userData.varify === 1){
                      res.redirect('/home');
                    }else{
                      res.render('login', {message:"please varify your mail"});
                  }
            }else{
                res.render('login', {message:"Email and Password Are Incorrect"});
            }

        }else{
            res.render('login', {message:"Email and Password Are Incorrect"});
        }
    } catch (error) {
        console.log(error.message);
    }
}

//loadhome 
const loadhome = (req,res)=>{
    try {
        res.render('home');
    } catch (error) {
        console.log(error.message);
    }
}


module.exports = {
    loadRegister,
    insertUser,
    varifymail,
    loadLogin,
    loginvarify,
    loadhome
}