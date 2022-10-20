var express = require('express');
var router = express.Router();

const nodemailer = require("nodemailer");

var db = require('../connection');

// Affichage de tous employes 

router.get('/',(req,res)=>{
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
 
 router.get('/:id' ,(req,res)=>{
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
 router.get('/mail/:mail' ,(req,res)=>{
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
 
 router.post('/',(req,res)=>{
     
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
 
 //update employe
 router.put('/:id',(req,res)=>{
 
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
router.put('/updatepassword/:id',(req,res)=>{

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
router.put('/UdateBasicInfo/:id',(req,res)=>{

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
 
 router.delete('/:id',(req,res)=>{
 
     let qID =req.params.id;
 
     let qr = `delete from user where id = ${qID} `;
     db.query(qr,(err,result)=>{
 
         if(err){console.log(err);}
     
         res.send({
         message:'La suppression d\'employe effectue'
         });
        });
 })
  
 router.post("/sendmail/mail/all/send", (req, res) => {
    
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


module.exports = router;
