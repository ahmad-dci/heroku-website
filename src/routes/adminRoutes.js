const express = require('express');
const multer = require('multer');
const authControllers = require('../controllers/authControllers');
const enduserControllers = require('../controllers/enduserController');
const adminRoutes = express.Router();

// this is a middleware to check the session for all routes under /admin 
// so you dont need to check session in every route indevedualy
adminRoutes.use((req, res, next)=>{
    if(req.session.user){
        next();
    }else{
        res.redirect('/');
    }
})

adminRoutes.route('/').get((req, res) => {
    res.render('adminMain');
    
});
const multerConf = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, callback){
        callback(null, Date.now()+'-'+file.originalname)
    }
});
const upload = multer({ storage: multerConf });
adminRoutes.use('/newadv',upload.array('photosInput',10));
adminRoutes.route('/newadv').get((req, res)=>{
    authControllers.getCategories((ok, result)=>{
        if(ok){
            console.log(result);
            res.render('newAdv',{result});
        }else{
            res.send(result);
        }
        
    })

});
adminRoutes.route('/newadv').post((req, res)=>{
    let photosArr = [];
    for (let i = 0; i < req.files.length; i++) {
        photosArr.push(req.files[i].destination.replace("./public","")+req.files[i].filename);
    }
    authControllers.newAdv(
        req.body.titleInput,
        req.body.keywordsInput,
        req.body.descTextarea,
        req.body.categorySelect,
        req.body.newCategory,
        photosArr,(result)=>{
            authControllers.getCategories((ok, result)=>{
                if(ok){
                    console.log(result);
                    res.render('newAdv',{result});
                }else{
                    res.send(result);
                }
            })
        }
         );
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
adminRoutes.route('/advsmanag').get((req, res)=>{
    enduserControllers.getAdvs((ok, result)=>{
        if(ok){
            res.render('advsmanag',{ result });
        }else{
            res.send(result);
        }
        
    })

});
adminRoutes.route('/advsedite/:id').get((req, res)=>{
    const advId = req.params.id;
authControllers.getAdv(advId,(chekAdv, adv)=>{

    if(chekAdv){
    authControllers.getCategories((ok, categories)=>{
        if(ok){
            res.render('advsedite',{categories, adv});
        }else{
            res.send(result);
        }
    });
}else{
    res.send(adv);
}



});

    
});
module.exports = adminRoutes;