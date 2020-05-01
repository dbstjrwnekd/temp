const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const session = require('express-session');
const models = require('./models/index.js');
const jwt = require('jsonwebtoken');
const secretObj = require('./config/jwt');

models.sequelize.sync().then( () =>{
    console.log("DB 연결 성공");
}).catch(err => {
    console.log("연결 실패");
    console.log(err);
});

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));
//aplication/json
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/',(req,res) => res.send("hello world haha"));

app.get('/api/hello', (req,res) => res.send("이제 되잖아 하하"));

app.post('/api/users/register',(req,res) => {
    var result;
    userInfo = req.body;
    //check password & password-confirm
    if(userInfo.password !== userInfo.confirmpassword){
        return res.json({
            isRegisterSuccess:false,
            message:"passwordMissmatch"
        });
    }
    //get informations from client & save data in database here
    var inputPassword = userInfo.password;
    var salt = Math.round((new Date().valueOf()*Math.random()))+"";
    var hashPassword = crypto.createHash('sha512').update(inputPassword+salt).digest('hex');
    models.User2.create({
        userID:userInfo.email,
        password:hashPassword,
        salt: salt,
        name: userInfo.name,
        image_profile: userInfo.profile_image,
        created_at: new Date(),
        updated_at: new Date()
    }).then(result => {
        console.log("data insert success");
        return res.json({
            isRegisterSuccess: true,
            user: result
        });
    }).catch(err => {
        return res.json({
            isRegisterSuccess: false,
            message: "duplicated Email"
        });
    });
});

app.post('/api/users/login',async function(req,res) {
        //generate token
        let token = jwt.sign({
            email:req.body.email
        },
        secretObj.secret,
        {
            expiresIn: '30m'
        });
    
        //find user with user-email
        var result = await models.User2.findOne({
            where: {
                email : req.body.email
            }
        });
        
        //if email not exist
        if(result==null){
            return res.json({
                loginSuccess:false,
                message:"Wrong Email"
            });
        }

        //hashing password
        var dbPassword = result.dataValues.password;
        var inputPassword = req.body.password;
        var salt = result.dataValues.salt;
        var hashPassword = crypto.createHash("sha512").update(inputPassword+salt).digest("hex");

        //if password not equals
        if(dbPassword != hashPassword){
            return res.json({
                loginSuccess: false,
                message: "Wrong Password"
            })
        }else{
            //give user token
            res.cookie("user",token);
            return res.json({
                loginSuccess: true,
                email : result.dataValues.email,
                name : result.dataValues.name,
                token: token
            });
        }
});

//remove token information
app.get('/api/users/logout',(req,res) => {
    if(req.cookies.user){
        res.clearCookie('user');
        console.log("token remove success");
        return res.status(200).send({
            success:true
        });
    }else{
        console.log('not logined');
    }
});

app.listen(port, () => console.log(`port on ${port}`));