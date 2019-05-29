const express = require('express');
const adminRoutes = express.Router();


adminRoutes.route('/').get((req, res) => {
    if(req.session.user){
        res.render('adminMain');
    }else{
        res.redirect('/');
    }
    
});
adminRoutes.route('/newadd').post((req, res)=>{
    console.log(req.body);
res.send(req.body.somtext);
});

module.exports = adminRoutes;