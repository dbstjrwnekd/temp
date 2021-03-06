const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const {auth} = require('./middleware/auth');
const {User} = require('./models/User');

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));
//aplication/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true,
    useFindAndModify:false
}).then(()=>console.log("mongoDB connected..."))
.catch(err=>console.log(err));

app.get('/',(req,res) => res.send("hello world haha"));

app.get('/api/hello', (req,res) => res.send("이제 되잖아 하하"));

app.post('/api/users/register',(req,res) => {

    //get informations from client & save data in database
    const user = new User(req.body);

    user.save((err, userInfo) => {
        if(err) return res.json({success:false,err});
        return res.status(200).json({
            success:true
        })
    });
});

app.post('/api/users/login',(req,res) => {
    User.findOne({email: req.body.email},(err,user) => {
        //find requested email in database
        if(!user){
            return res.json({
                loginSuccess: false,
                message: "there are no email in database"
            })
        }
        //check password
        user.comparePassword(req.body.password , (err,isMatch) => {
            if(!isMatch)
            return res.json({
                isloginSuccess:false,
                message:"wrong password"
            })
        });
        //token generate
        user.generateToken((err,user) => {
            if(err) return res.status(400).send(err);

            //save token in cookie
            res.cookie("x_auth",user.token)
            .status(200)
            .json({
                loginSuccess:true,
                userId : user._id
            });

        });


    });
});

app.get('/api/users/auth', auth,(req,res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0? false: true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname : req.user.lastname,
        role:req.user.role,
        image: req.user.image

    });
});

app.get('/api/users/logout',auth,(req,res) => {
    User.findOneAndUpdate({_id:req.user._id},
    {token: ""},
    (err,user) => {
        if(err) return res.json({success:false,err});
        return res.status(200).send({
            success: true
        });
    });
});

app.listen(port, () => console.log(`port on ${port}`));


