const islogin = (req,res,next)=>{
    try {
        res.render('login');
    } catch (error) {
        console.log(error.message);
    }
    next();
}

const islogout = (req,res,next)=>{
    try {
        res.render('logout');
    } catch (error) {
        console.log(error.message);
    }
    next();
}

module.exports = {
    islogout,
    islogin
}

