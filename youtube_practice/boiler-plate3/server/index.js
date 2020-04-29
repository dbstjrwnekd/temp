const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const session = require('express-session');

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));
//aplication/json
app.use(bodyParser.json());
app.use(session({
    key:'sid',
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24000 * 60 * 60
    }
}));
app.use(cookieParser());

app.get('/',(req,res) => res.send("hello world haha"));

app.get('/api/hello', (req,res) => res.send("이제 되잖아 하하"));

app.post('/api/users/register',(req,res) => {
    var sqlConnect = require('./config/dev');
    sqlConnect.connect();
    var result;
    //get informations from client & save data in database
    userInfo = req.body;
    if(userInfo.password !== userInfo.confirmpassword){
        return res.json({
            isloginSuccess:false,
            message:"passwordMissmatch"
        });
    }
    var inputPassword = userInfo.password;
    var salt = Math.round((new Date().valueOf()*Math.random()))+"";
    var hashPassword = crypto.createHash('sha512').update(inputPassword+salt).digest('hex');

    var sql = 'INSERT INTO user(email,password,salt,name,profile_image)VALUES(?,?,?,?,?)';

    var params = [userInfo.email,hashPassword,salt,userInfo.name,userInfo.profile_image];
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
    var sqlConnect = require('./config/dev');
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
                var hashPassword = crypto.createHash('sha512').update(req.body.password+user.salt).digest('hex');
                if(user.password != hashPassword){
                    console.log(user.password,req.body.password);
                    return res.json({
                        isloginSuccess:false,
                        message:"wrong password"
                    });
                }
                sqlConnect.end();
                req.session.user = user;
                return res.json({
                    email : user.email,
                    name : user.name
                })
            }else
              console.log('Error while performing Query.', err);
              sqlConnect.end();
              return res.json({
                isloginSuccess:false,
                message:"sql error"
            });
        });
});

app.get('/api/users/logout',(req,res) => {
    if(req.session.user){
        req.session.destroy(function(err){
            if(err){
                console.log('세션 삭제 실패');
                return res.json({success:false,err});
            }else{
                console.log('세션 삭제 성공');
                res.clearCookie('sid');
                return res.status(200).send({
                    success: true
                });
            }
        });
    }else{
        console.log('not logined');

    }
});

app.listen(port, () => console.log(`port on ${port}`));