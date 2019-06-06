const express = require('express');
const multer = require('multer');
const authControllers = require('../controllers/authControllers');
const adminRoutes = express.Router();



adminRoutes.route('/').get((req, res) => {
    if(req.session.user){
        res.render('adminMain');
    }else{
        res.redirect('/');
    }
    
});
const multerConf = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, callback){
        callback(null, Date.now()+'-'+file.originalname)
    }
});
const upload = multer({ storage: multerConf });
adminRoutes.use('/newadd',upload.array('photosInput'));
adminRoutes.route('/newadd').post((req, res)=>{
    console.log(req.files);
res.send(req.files);
});

adminRoutes.route('/changepassword').get((req, res)=>{
    if(req.session.user){
        res.render('changepassword');
    }else{
        res.redirect('/');
    }
// res.send('you will change your password here');
});
adminRoutes.route('/changepassword').post((req, res)=>{
authControllers.changePassword(req.session.user._id,req.body.changepswInput,(result)=>{
    req.session.destroy();
res.redirect('/auth/login');
});
//res.send(req.body.changepswInput);
});
module.exports = adminRoutes;