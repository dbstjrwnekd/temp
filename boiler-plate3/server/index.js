const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const sqlConnect = require('./config/dev');

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));
//aplication/json
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/',(req,res) => res.send("hello world haha"));

app.get('/api/hello', (req,res) => res.send("이제 되잖아 하하"));

app.post('/api/users/register',(req,res) => {
    sqlConnect.connect();
    var result;
    //get informations from client & save data in database
    userInfo = req.body;
    
    var sql = 'INSERT INTO user(email,password,password_confirm,name,profile_image)VALUES(?,?,?,?,?)';

    var params = [userInfo.email,userInfo.password,userInfo.confirmpassword,userInfo.name,userInfo.profile_image];
    sqlConnect.query(sql,params,function(err,rows,fields) {
        if(err){
            console.log(err);
            result = err;
            sqlConnect.end();
            return result;
        }else{
            console.log(rows.insertId);
        }
        result = rows[rows.insertId];
        sqlConnect.end();
        return result;
    });
});

app.post('/api/users/login',(req,res) => {
    sqlConnect.connect();
        var sql = 'SELECT * FROM user where email = ?';
        var param = [req.body.email];
        var user = null;
        sqlConnect.query(sql,param,function(err, rows, fields) {
            if (!err){
              console.log('success');
              user = rows[0];
              //find requested email in database
                if(!user){
                    return res.json({
                        loginSuccess: false,
                        message: "there are no email in database"
                    })
                }
                //check password
                if(user.password != req.body.password){
                    console.log(user.password,req.body.password);
                    return res.json({
                        isloginSuccess:false,
                        message:"wrong password"
                    });
                }
                sqlConnect.end();
                return res.json({
                    email : user.email,
                    name : user.name
                })
            }else
              console.log('Error while performing Query.', err);
              return res.json({
                isloginSuccess:false,
                message:"sql error"
            });
        });
});

app.listen(port, () => console.log(`port on ${port}`));


