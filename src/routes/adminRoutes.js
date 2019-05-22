const express = require('express');
const { MongoClient } = require('mongodb');
//const MongoClient = require('mongodb').MongoClient;

const dbUrl = 'mongodb+srv://lion:jeny@cluster0-rmrmn.mongodb.net/test?retryWrites=true';
const dbName ='herokuwebDB';

const adminRoutes = express.Router();

adminRoutes.route('/register').get((req, res) => {
    res.render('register');
});
adminRoutes.route('/register').post((req, res) => {
    
    (async function mongo(){
        let client;
        try {
            client = await MongoClient.connect(dbUrl, { useNewUrlParser: true });
            const db = client.db(dbName);
            const response = await db.collection('users').insertOne({username: req.body.email, password: req.body.password});
            res.send(response);
        } catch (error) {
            res.send(error.message);
        }
        client.close();

    }());

    
});


module.exports = adminRoutes;