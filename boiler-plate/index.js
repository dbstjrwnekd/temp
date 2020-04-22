const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');

const config = require('./config/key');
const {User} = require('./models/User');

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));
//aplication/json
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true,
    useFindAndModify:false
}).then(()=>console.log("mongoDB connected..."))
.catch(err=>console.log(err));

app.get('/',(req,res) => res.send("hello world haha"));

app.post('/register',(req,res) => {

    //get informations from client & save data in database
    const user = new User(req.body);

    user.save((err, userInfo) => {
        if(err) return res.json({success:false,err});
        return res.status(200).json({
            success:true
        })
    });
});

app.listen(port, () => console.log(`port on ${port}`));


