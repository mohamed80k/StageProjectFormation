var express = require('express');
var bodyparser = require('body-parser');
var cors = require('cors');
const mysql=require('mysql2')
const app=express();
const nodemailer = require("nodemailer");
app.use(cors());
app.use(bodyparser.json());

//database connection
// database connection
const db =mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:'myfirsdb',
    port:3306
});

// check database connection
db.connect(err=>{
if (err){
    console.log(err,"dberr");}
console.log('database connected ...');
})

// Affichage de tous employes 

app.get('/employee',(req,res)=>{
   let qr= 'select * from user';
   db.query(qr,(err,result)=>{
    if(err){
        console.log(err,'errs');
    }

    if(result.length>0)
    {
    res.send({
    message:'tous les employes',
    data:result
    });
}
});
});

// Affichage des employes selon id

app.get('/employee/:id' ,(req,res)=>{
    let gID = req.params.id;
    let qr = `select * from user where id = ${gID}`;

    db.query(qr,(err,result)=>{

    if(err) {console.log(err);}
    if(result.length>0)
    {
        res.send({
        message:'Employe existe',
        data:result
        });
    }
    else{
        res.send({
        message:'Employe n\'existe pass'
      });
    }
    });
})


//***********Selon mail */
app.get('/:mail' ,(req,res)=>{
    let gMail = req.params.mail;
    let qr = `select * from user where mail = '${gMail}'`;

    db.query(qr,(err,result)=>{

    if(err) {console.log(err);}
    if(result.length>0)
    {
        res.send({
        message:'Employe existe',
        data:result
        });
    }
    else{
        res.send({
        message:'Employe n\'existe passs'
      });
    }
    });
})

// create d'employe

app.post('/employee',(req,res)=>{
    
console.log(req.body, 'createdata');
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let cin = req.body.cin;
    // let formations = req.body.formations;
    let metier = req.body.metier;
    let mail = req.body.mail;
  
    let PassWord = req.body.PassWord;

let qr = `insert into user(firstname,lastname,cin,metier,mail,PassWord)
values('${firstname}','${lastname}','${cin}','${metier}','${mail}','${PassWord}')`;

    db.query(qr,(err,result)=>{
        console.log(result, 'result');
        res.send({
        message:'data inserted'
        });
});
});


// insert into table formation disponible

app.post('/formation_dispo',(req,res)=>{
    
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
    
 
    
//update employe
app.put('/employee/:id',(req,res)=>{

    console.log(req.body, 'Update data');

    let gID = req.params.id;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let cin = req.body.cin;
    // let formations = req.body.formations;
    let metier = req.body.metier;
    let mail = req.body.mail;
   
    let PassWord = req.body.PassWord;

    let qr = `update user set firstname= '${firstname}',lastname= '${lastname}',cin='${cin}',metier='${metier}',mail='${mail}',PassWord='${PassWord}'
              where id= ${gID}`;
    
   db.query(qr,(err,result)=>{

    if(err){console.log(err);}

    res.send({
    message:'mise à jour d\'employe effectue'
    });
   });
})

// update password
app.put('/employee/updatepassword/:id',(req,res)=>{

    console.log(req.body, 'Update data');

    let gID = req.params.id;
 
    let PassWord = req.body.PassWord;

    let qr = `update user set PassWord='${PassWord}'
              where id= ${gID}`;
    
   db.query(qr,(err,result)=>{

    if(err){console.log(err);}

    res.send({
    message:'mise à jour d\'employe effectue'
    });
   });
})
app.put('/employee/UdateBasicInfo/:id',(req,res)=>{

    console.log(req.body, 'Update data');

    let gID = req.params.id;
 
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let mail = req.body.mail;

    let qr = `update user set firstname='${firstname}',lastname='${lastname}', mail='${mail}'
              where id= ${gID}`;
    
   db.query(qr,(err,result)=>{

    if(err){console.log(err);}

    res.send({
    message:'mise à jour d\'employe effectue'
    });
   });
})

// delete single data

app.delete('/employee/:id',(req,res)=>{

    let qID =req.params.id;

    let qr = `delete from user where id = ${qID} `;
    db.query(qr,(err,result)=>{

        if(err){console.log(err);}
    
        res.send({
        message:'La suppression d\'employe effectue'
        });
       });
})

// Affichage de tous admin 

app.get('/admin/all',(req,res)=>{
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

app.get('/formation/:id' ,(req,res)=>{
    let gID = req.params.id;
    let qr = `select * from formation1 where id = ${gID}`;

    db.query(qr,(err,result)=>{

    if(err) {console.log(err);}
    if(result.length>0)
    {
        res.send({
        message:'Formation existe',
        data:result
        });
    }
    else{
        res.send({
        message:'Formation n\'existe pass'
      });
    }
    });
})
app.get('/formationpartie/:forma' ,(req,res)=>{
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

app.get('/formationlesson/:party' ,(req,res)=>{
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




app.get('/formations_non_dispo/:id',(req,res)=>{
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


app.get('/formationchapitre/:lesson' ,(req,res)=>{
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
// app.get('/formationhtml/:chapitr' ,(req,res)=>{
//     let gChapitr = req.params.chapitr;

//     let qr = `select  HTML from chapitre where nom_chapitre = '${gChapitr}'`;

//     db.query(qr,(err,result)=>{

//     if(err) {console.log(err);}
//     if(result.length>0)
//     {
//         res.send({
//         message:'formation existe',
//         data:result
//         });
//     }
//     else{
//         res.send({
//         message:'formation n\'existe passs'
//       });
//     }
//     });
// })
// Send Mail
app.post("/sendmail/mail/all/send", (req, res) => {
    
    let user = req.body;
  
    sendMail(user, info => {
   
    res.send(info);
  });
  });
  
  async function sendMail(user) {
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'ennabouchmohamed@gmail.com',
          pass: 'pkqdnqazdainszny'
        }
      });
      
      var mailOptions = {
        
        from: 'ennabouchmohamed@gmail.com',
        to: user.mail,


        subject: 'Formation',
            html: `<div id=":12v" class="a3s aiL ">Bonjour  Mme/Mr ${user.firstname} ${user.lastname} ,<br><br>

            Merci de trouver ci-joint les données permettant l'accés à  la plateforme formation.<br><br><br>
            
            your email is: ${user.mail}<br>
            your password is : ${user.PassWord}<br>
            Lien: <a href="http://moodle-ensat.uae.ac.ma" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://moodle-ensat.uae.ac.ma&amp;source=gmail&amp;ust=1661262501471000&amp;usg=AOvVaw0ptYE0a5cDrZOnBLCit4or">http://formation-<span class="il">ensat</span>.uae.ac.ma</a> <br><br><br>
            
            NB:
            Merci de réinitialiser votre mot de passe
            <br><br> 
            bien cordialement,
            </div>`

      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  
   
  


  }

  
app.get('/lessonpart/:lesson' ,(req,res)=>{
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

app.get('/formationss/all',(req,res)=>{

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

 app.get('/partformation/:part' ,(req,res)=>{
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

app.get('/formationdisponible/:id_user' ,(req,res)=>{
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
app.get('/formationhtml/:id/:chapitr' ,(req,res)=>{
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
app.get('/id_chapitre/:id/:chapitre' ,(req,res)=>{
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
app.get('/chapitre_id/:id' ,(req,res)=>{
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
app.get('/id_less/:less' ,(req,res)=>{
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
app.get('/id_less_chap/:id' ,(req,res)=>{
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

app.get('/id_last_viewed/:id' ,(req,res)=>{
    let gID = req.params.id;
    let qr = `select last_viewed from users where id = '${gID}'`;
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
app.put('/updatelastlesson/:id/:form',(req,res)=>{

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
app.put('/updateviewed/:id',(req,res)=>{

    console.log(req.body, 'Update data');

    let gID = req.params.id;
 
    let last_viewed = req.body.last_viewed;

    let qr = `update users set last_viewed ='${last_viewed}'
              where id = '${gID}'`;
    
   db.query(qr,(err,result)=>{

    if(err){console.log(err);}

    res.send({
    message:'mise à jour d\'employe effectue'
    });
   });
})
//****** */
app.listen(3000,()=>{
    console.log('server runnig...');
});




