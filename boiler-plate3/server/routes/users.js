const express = require('express');
const router = express.Router();
const models = require('../models/index');


//=================================
//             Users
//=================================

// =========================== 회원 이메일 불러오기 ===========================
router.get('/', async (req, res) => {
    //Where절 추가?(관리자 1, 회원2)
    models.User.findAll({
        attributes: ['email']
    }).then(result => {
        return res.json(result);
    })
})

module.exports = router;