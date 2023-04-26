const mysql=require('mysql');


const conn=mysql.createConnection({
   host:'localhost',
   user:'root',
   password:'',
   database:'expencetracker'
})

conn.connect((err)=>{
   if(err)throw err;
   console.log("connection successfull");
})

module.exports=conn;