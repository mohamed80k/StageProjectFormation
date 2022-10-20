var express = require('express');
var router = express.Router();


var db = require('../connection');
// Affichage de tous admin 

router.get('/all',(req,res)=>{
   let qr= 'select * from admin';
   db.query(qr,(err,result)=>{
    if(err){
        console.log(err,'errs');
    }

    if(result.length>0)
    {
    res.send({
    message:'tous les admin',
    data:result
    });
}
});
});

module.exports = router;