const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const models = require('./models/index.js');
const jwt = require('jsonwebtoken');
const secretObj = require('./config/jwt');
const sequelize = require('sequelize');
const Op = sequelize.Op;

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

app.get('/api/categories', (req, res) => {
    models.Category.findAll({})
        .then(result => {
            return res.json(result);
        }).catch( err=> {
            console.log(err)
        });
});

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
    models.User.create({
        userID:userInfo.email,
        password:hashPassword,
        salt: salt,
        name: userInfo.name,
        image_profile: userInfo.profile_image,
        created_at: new Date(),
        updated_at: new Date(),
        age:userInfo.age,
        gender:userInfo.gender,
        roleId:2
    }).then(result => {
        for(var i=0;i<userInfo.categoryIds.length;i++){
            models.User_Category.create({
                userId : result.dataValues.id,
                categoryId : userInfo.categoryIds[i]
            });
            models.sequelize.query("UPDATE category_id SET counting=counting+1 WHERE id = :id",{
                replacements:{id:userInfo.categoryIds[i]}
            });
        }
        console.log("user_info insert success");
        return res.json({
            isRegisterSuccess: true,
            user: result,
            categorys: userInfo.categorys
        });
    }).catch(err => {
        console.log(err);
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
            expiresIn: '60m'
        });
    
        //find user with user-email
        var result = await models.User.findOne({
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

//검색
app.get('/api/booktrailer/search/:searchWord',(req,res) => {
    var searchWord = req.params.searchWord;

    models.BookTrailer.findAll({
        where:{
            [Op.or]:[
                {
                    title:{
                        [Op.like]: "%"+searchWord+"%"
                    }
                },
                {
                    author:{
                        [Op.like]: "%"+searchWord+"%"
                    }
                },
                {
                    content:{
                        [Op.like]: "%"+searchWord+"%"
                    }
                }
            ]
        }
    }).then(result => {
        return res.json({
            isSearchSuccess:true,
            data:result
        });
    }).catch(err => {
        return res.json({
            isSearchSuccess:false,
            message:err
        });
    });
});

app.listen(port, () => console.log(`port on ${port}`));