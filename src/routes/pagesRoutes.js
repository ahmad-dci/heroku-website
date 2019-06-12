const express = require('express');
const endUserController = require('../controllers/enduserController');

const pagesRoutes = express.Router();

pagesRoutes.route('/').get((req, res)=>{
    endUserController.getAdvs((ok, result)=>{
if(ok){
    //res.send(result);
    res.render('index', {result});
}else{
    res.send(result);
}

    });

});
pagesRoutes.route('/about').get((req, res)=>{
    
    res.render('index');
    });


module.exports = pagesRoutes;