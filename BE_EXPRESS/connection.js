const mysql = require('mysql2');


var db_config = {
    host:'localhost',
    user:'root',
    password:"",
    database:'bdformation2',
    port:3306,
    connectTimeout: 10000 
 };
 var pool  = mysql.createPool(db_config);
 
 pool.getConnection(function(err, connection) {
   console.log("connected")
 });
 
 pool.on('error', function(err) {
   console.log(err.code); 
 });
 
 module.exports = pool;









