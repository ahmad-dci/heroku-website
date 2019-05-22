const express = require('express');

const pagesRoutes = express.Router();

pagesRoutes.route('/').get((req, res)=>{
res.render('index');
});
pagesRoutes.route('/about').get((req, res)=>{
    res.render('index');
    });


module.exports = pagesRoutes;