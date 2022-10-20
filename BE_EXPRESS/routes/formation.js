var express = require('express');
var router = express.Router();



//database connection
var db = require('../connection');


router.get('/formationpartie/:forma' ,(req,res)=>{
    let gForma = req.params.forma;
    let qr = `select nom_part from part where id_formation = (select id_formation from formation where nom_formation = '${gForma}')`;

    db.query(qr,(err,result)=>{

    if(err) {console.log(err);}
    if(result.length>0)
    {
        res.send({
        message:'formation existe',
        data:result
        });
    }
    else{
        res.send({
        message:'formation n\'existe passs'
      });
    }
    });
})

router.get('/formationlesson/:party' ,(req,res)=>{
    let gParty = req.params.party;
    let qr = `select nom_lesson from lesson where id_part = (select id_part from part where nom_part = '${gParty}')`;

    db.query(qr,(err,result)=>{

    if(err) {console.log(err);}
    if(result.length>0)
    {
        res.send({
        message:'formation existe',
        data:result
        });
    }
    else{
        res.send({
        message:'part n\'existe passs'
      });
    }
    });
})

router.get('/formations_non_dispo/:id',(req,res)=>{
    let gID = req.params.id;
    let qr= `select * from formation where id_formation NOT IN (select id_formation from formation_disponible where id_user = '${gID}')`;
    db.query(qr,(err,result)=>{
     if(err){
         console.log(err,'errs');
     }
 
     if(result.length>0)
     {
     res.send({
     message:'toutes les formations',
     data:result
     });
 }
 });
 });
// ******************************


router.get('/formationchapitre/:lesson' ,(req,res)=>{
    let gLesson = req.params.lesson;
    let qr = `select nom_chapitre from chapitre where id_lesson = (select id_lesson from lesson where nom_lesson = '${gLesson}')`;

    db.query(qr,(err,result)=>{

    if(err) {console.log(err);}
    if(result.length>0)
    {
        res.send({
        message:'formation existe',
        data:result
        });
    }
    else{
        res.send({
        message:'formation n\'existe passs'
      });
    }
    });
})



router.post('/formation_dispo',(req,res)=>{
    
    console.log(req.body, 'createdata');
        let id_user = req.body.id_user;
        let id_formation = req.body.id_formation;
   
    
    let qr = `insert into formation_disponible(id_user,id_formation)
    values('${id_user}','${id_formation}')`;
   
    
        db.query(qr,(err,result)=>{
            console.log(result, 'result');
            res.send({
            message:'data inserted'
            });
    });
    });


    router.get('/lessonpart/:lesson' ,(req,res)=>{
        let gLesson = req.params.lesson;
        let qr = `select nom_part from part where id_part = (select id_part from lesson where nom_lesson = '${gLesson}')`;
    
        db.query(qr,(err,result)=>{
    
        if(err) {console.log(err);}
        if(result.length>0)
        {
            res.send({
            message:'formation existe',
            data:result
            });
        }
        else{
            res.send({
            message:'formation n\'existe passs'
          });
        }
        });
    })
    
    router.get('/formationss/all',(req,res)=>{
    
        let qr= 'select * from formation';
        db.query(qr,(err,result)=>{
         if(err){
             console.log(err,'errs');
         }
     
         if(result.length>0)
         {
         res.send({
         message:'toutes les formations',
         data:result
         });
     }
     });
     });
    
     router.get('/partformation/:part' ,(req,res)=>{
        let gPart = req.params.part;
        let qr = `select nom_formation from formation where id_formation = (select id_formation from part where nom_part = '${gPart}')`;
    
        db.query(qr,(err,result)=>{
    
        if(err) {console.log(err);}
        if(result.length>0)
        {
            res.send({
            message:'formation existe',
            data:result
            });
        }
        else{
            res.send({
            message:'formation n\'existe passs'
          });
        }
        });
    })
    
    router.get('/formationdisponible/:id_user' ,(req,res)=>{
        let gID = req.params.id_user;
        let qr = `select * from formation where id_formation in (select id_formation from formation_disponible where id_user = '${gID}')`;
    
        db.query(qr,(err,result)=>{
    
        if(err) {console.log(err);}
        if(result.length>0)
        {
            res.send({
            message:'formation existe',
            data:result
            });
        }
        else{
            res.send({
            message:'formation n\'existe passs'
          });
        }
        });
    })
    router.get('/formationhtml/:id/:chapitr' ,(req,res)=>{
        let gChapitr = req.params.chapitr;
        let gID = req.params.id;
    
        let qr = `select  HTML from chapitre where nom_chapitre = '${gChapitr}' and id_lesson = '${gID}'`;
    
        db.query(qr,(err,result)=>{
    
        if(err) {console.log(err);}
        if(result.length>0)
        {
            res.send({
            message:'formation existe',
            data:result
            });
        }
        else{
            res.send({
            message:'formation n\'existe passs'
          });
        }
        });
    })
    router.get('/id_chapitre/:id/:chapitre' ,(req,res)=>{
        let gID = req.params.id;
        let gChap = req.params.chapitre;
        let qr = `select * from chapitre where id_chapitre = 1+(select id_chapitre from chapitre where id_lesson = '${gID}' AND nom_chapitre = '${gChap}')`;
    
        db.query(qr,(err,result)=>{
    
        if(err) {console.log(err);}
        if(result.length>0)
        {
            res.send({
            message:'chapitre existe',
            data:result
            });
        }
        else{
            res.send({
            message:'chapitre n\'existe passs'
          });
        }
        });
    })
    router.get('/chapitre_id/:id' ,(req,res)=>{
        let gID = req.params.id;
        let qr = `select * from chapitre where id_chapitre = '${gID}'`;
    
        db.query(qr,(err,result)=>{
    
        if(err) {console.log(err);}
        if(result.length>0)
        {
            res.send({
            message:'chapitre existe',
            data:result
            });
        }
        else{
            res.send({
            message:'chapitre n\'existe passs'
          });
        }
        });
    })
    router.get('/id_less/:less' ,(req,res)=>{
        let gLess = req.params.less;
        let qr = `select * from lesson where nom_lesson = '${gLess}'`;
    
        db.query(qr,(err,result)=>{
    
        if(err) {console.log(err);}
        if(result.length>0)
        {
            res.send({
            message:'lesson existe',
            data:result
            });
        }
        else{
            res.send({
            message:'lesson n\'existe passs'
          });
        }
        });
    })
    router.get('/id_last_viewed/:id' ,(req,res)=>{
        let gID = req.params.id;
        let qr = `select last_viewed from user where id = '${gID}'`;
        db.query(qr,(err,result)=>{
            if(err){
                console.log(err,'errs');
            }
        
            if(result.length>0)
            {
            res.send({
            message:'toutes les formations',
            data:result
            });
        }
        });
    });
    router.get('/id_less_chap/:id' ,(req,res)=>{
        let gID = req.params.id;
        let qr = `select * from lesson where id_lesson = 1+'${gID}'`;
    
        db.query(qr,(err,result)=>{
    
        if(err) {console.log(err);}
        if(result.length>0)
        {
            res.send({
            message:'lesson existe',
            data:result
            });
        }
        else{
            res.send({
            message:'lesson n\'existe passs'
          });
        }
        });
    })
    
    
    router.put('/updateviewed/:id',(req,res)=>{
    
        console.log(req.body, 'Update data');
    
        let gID = req.params.id;
     
        let last_viewed = req.body.last_viewed;
    
        let qr = `update user set last_viewed ='${last_viewed}'
                  where id = '${gID}'`;
        
       db.query(qr,(err,result)=>{
    
        if(err){console.log(err);}
    
        res.send({
        message:'mise à jour d\'employe effectue'
        });
       });
    })
    router.put('/updatelastlesson/:id/:form',(req,res)=>{

        console.log(req.body, 'Update data');
    
        let gID = req.params.id;
        let gForm = req.params.form;
     
        let last_viewed = req.body.last_lesson;
    
        let qr = `update formation_disponible set last_lesson ='${last_viewed}'
                  where id_user = '${gID}' and id_formation = (select id_formation from formation where nom_formation = '${gForm}' )`;
        
       db.query(qr,(err,result)=>{
    
        if(err){console.log(err);}
    
        res.send({
        message:'mise à jour d\'employe effectue'
        });
       });
    })
    router.get('/id_last_lesson/:id/:form' ,(req,res)=>{
        let gID = req.params.id;
        let gFORM = req.params.form;
        let qr = `select last_lesson from formation_disponible where id_user = '${gID}' and id_formation =(select id_formation from formation where nom_formation = '${gFORM}')`;
        db.query(qr,(err,result)=>{
            if(err){
                console.log(err,'errs');
            }
        
            if(result.length>0)
            {
            res.send({
            message:'id last lesson viewed',
            data:result
            });
        }
        });
    });
    
module.exports = router;