const e = require('express');
const conn = require('../config/database');
const bcryptjs = require('bcryptjs');
exports.signup = (req, res) => {
    res.sendFile(`C:/Users/RITIK/Documents/Sharpener  Node Js  projets or backend/Expence Tracker full login features/views/signup.html`);
}

exports.insertData = async(req, res) => {
    // console.log(req.body);
    const password = req.body.password;  

    const encryptedPassword = await bcryptjs.hash(password, 10);
    // console.log(encryptedPassword);
    const sqlvalid = `select * from signup WHERE email='${req.body.email}'`;

    conn.query(sqlvalid, (err, resulValid) => {

        if (resulValid.length > 0) {
            res.send("<h1>User Already Exists</h1>");
        }else{
             console.log("You are in else part");
                const sql = `INSERT INTO signup(sno, name, email, password) VALUES ('','${req.body.name}','${req.body.email}','${encryptedPassword}')`
                conn.query(sql, (err, result)=>{
                    console.log("data inserted ")
                 
                })
                // alert("You are successfully registered");
                res.redirect('/');
                  
     



        }

        
    })


}

exports.login = (req, res) => {
    res.sendFile("C:/Users/RITIK/Documents/Sharpener  Node Js  projets or backend/Expence Tracker full login features/views/login.html")
}

exports.logindata = async(req, res) => {

    // console.log(req.body)
    const email = req.body.email;
    const password = req.body.password;
    if (email && password) {
       
        const sql = `select * from signup WHERE email='${email}'`;
        conn.query(sql, (err, result) => {
            if (result.length > 0) {
                // console.log(result[0].password);
                const comparison =  bcryptjs.compare(password, result[0].password).then((success)=>{
                    // console.log(" password match "+ success)
                    if(success){
                        res.redirect('/welcomepage');

                    }else{
                        res.send("<h1>Please Enter rigth email and password</h1>");

                    }
                

                }).catch((err)=>{
                    res.status=404;
                    console.log(err);
              
                })
            } else{
                res.send({status:"password not match"})
            }


        })

    } else {


        res.redirect('/login');
    }




}

exports.welcomePage = (req, res) => {

    res.sendFile("C:/Users/RITIK/Documents/Sharpener  Node Js  projets or backend/Expence Tracker full login features/views/welcome.html")

}