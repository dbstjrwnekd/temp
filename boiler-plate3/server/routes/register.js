const express = require('express');
const router = express.Router();
const models = require('../models/index');

const crypto = require('crypto');


//=================================
//             Register
//=================================

// =========================== 회원가입 ===========================
router.post('/', (req, res) => {
    userInfo = req.body;
    //비밀번호 일치 여부 확인하기
    if(userInfo.password !== userInfo.confirmpassword){
        return res.json({
            isRegisterSuccess:false,
            message:"passwordMissmatch"
        });
    }
    //비밀번호 암호화
    var inputPassword = userInfo.password;
    var salt = Math.round((new Date().valueOf()*Math.random()))+"";
    var hashPassword = crypto.createHash('sha512').update(inputPassword+salt).digest('hex');
    
    //정보 저장하기
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
            //유저-카테고리 관계 추가
            models.User_Category.create({
                userId : result.dataValues.id,
                categoryId : userInfo.categoryIds[i]
            });

            //카테고리 count증가(*)
            models.sequelize.query("UPDATE category_id SET counting=counting+1 WHERE id = :id",{
                replacements:{id:userInfo.categoryIds[i]}
            });
        }
        console.log("================== user_info insert success ==================");
        return res.json({
            isRegisterSuccess: true,
            user: result,
            categorys: userInfo.categorys
        });
        //이메일 중복 또는 에러 확인
    }).catch(err => {
        console.log(err);
        return res.json({
            isRegisterSuccess: false,
            message: "duplicated Email"
        });
    });
});

module.exports = router;