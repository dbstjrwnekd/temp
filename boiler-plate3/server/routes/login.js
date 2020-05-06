const express = require('express');
const router = express.Router();
const models = require('../models/index');

const jwt = require('jsonwebtoken');
const secretObj = require('../config/jwt');
const crypto = require('crypto');


//=================================
//             Login
//=================================

// =========================== 로그인 하기 ===========================
router.post('/',async function(req,res) {
    //토큰 생성하기
    let token = jwt.sign({
        email:req.body.email
    },
    secretObj.secret,
    {
        //회원 로그인 60분 유지
        expiresIn: '60m'
    });

    //이메일로 회원 찾기
    var result = await models.User.findOne({
        where: {
            email : req.body.email
        }
    });
    
    //가입이 안되어있는 이메일
    if(result==null){
        return res.json({
            loginSuccess:false,
            message:"Wrong Email"
        });
    }

    //입력한 비밀번호 암호화하기
    var dbPassword = result.dataValues.password;
    var inputPassword = req.body.password;
    var salt = result.dataValues.salt;
    var hashPassword = crypto.createHash("sha512").update(inputPassword+salt).digest("hex");

    //비밀번호가 틀림
    if(dbPassword != hashPassword){
        return res.json({
            loginSuccess: false,
            message: "Wrong Password"
        })
    }else{
        //비밀번호가 맞으면 토큰 Cookie에 저장하기
        res.cookie("user",token);
        return res.json({
            loginSuccess: true,
            email : result.dataValues.email,
            name : result.dataValues.name,
            token: token
        });
    }
});

module.exports = router;