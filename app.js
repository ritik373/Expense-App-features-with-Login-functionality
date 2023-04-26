const express=require('express');
const app=express();
const controller=require('./controller/routes')
const bodyparser=require('body-parser');
const { urlencoded } = require('body-parser');
const path=require('path');

app.use(bodyparser.urlencoded({ extended: true }))
app.use('/public',express.static('public'));
// app.use(bodyparser.json())
console.log(path.join(__dirname,'public'));

app.get('/',controller.signup);
app.post('/submitdata',controller.insertData);

app.get('/login',controller.login);
app.post('/logindata',controller.logindata);

app.get('/welcomepage',controller.welcomePage);

app.listen(8000,(req,res)=>{
    console.log("listening o port 8000...")
})