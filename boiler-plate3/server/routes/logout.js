const express = require('express');
const router = express.Router();


//=================================
//             Logout
//=================================

// =========================== 로그아웃 하기 ===========================
router.get('/',(req,res) => {
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

module.exports = router;