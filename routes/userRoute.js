//Server Express 

const express = require('express');
const router = express();

//session 
// const session = require('express-session');
// const config = session({secret})


//Controllers
const userController = require('../controllers/userController.js');

//Middlewares
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

//multer file uploading mate
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
         callback(null,path.join(__dirname, '../public/userImages'));
    },
    filename:(req,file,callback)=>{
        const name = Date.now()+"-"+file.originalname;
        callback(null,name);
    }
});

const upload = multer({storage:storage});

//EJS 
router.set('view engine', 'ejs');
router.set('views', './views/users');

//Routes

router.get('/register',userController.loadRegister);
router.post('/register', upload.single('image'), userController.insertUser);
router.get('/varifymail', userController.varifymail);
// router.get('/', userController.loadLogin);
router.get('/login', userController.loadLogin);
router.post('/login', userController.loginvarify);

router.get('/home', userController.loadhome);


module.exports = router;
