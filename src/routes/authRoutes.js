const express = require('express');
const { MongoClient } = require('mongodb');
//const MongoClient = require('mongodb').MongoClient;
const authControllers = require('../controllers/authControllers');

const dbUrl = 'mongodb+srv://lion:jeny@cluster0-rmrmn.mongodb.net/test?retryWrites=true';
const dbName ='herokuwebDB';

const authRoutes = express.Router();

authRoutes.route('/register').get((req, res) => {
    res.render('register' ,{ userExist: false });
});
authRoutes.route('/register').post((req, res) => {
    authControllers.addUser(req.body.email, req.body.password, (check)=>{
        if(check){
            res.redirect('/admin');
        }else{
            res.render('register',{ userExist: true });
        }
    });
    
    
    
});
authRoutes.route('/login').get((req, res)=>{
res.render('login',{loginMessage: false});
});
authRoutes.route('/login').post((req, res)=>{
    authControllers.checkUser(req.body.email, req.body.password, (user)=>{
if(user){
    req.session.user = user;
res.redirect('/admin');
}
else{
    res.render('login',{loginMessage: true});
}
    })
});
authRoutes.route('/logout').get((req, res)=>{
    req.session.destroy();
    res.redirect('/');
});
module.exports = authRoutes;