const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const models = require('./models/index.js');


//=========================== DB 연결 ===========================
models.sequelize.sync().then(() => {
    console.log("===========================DB 연결 성공===========================");
}).catch(err => {
    console.log("=========================== DB 연결 실패===========================");
    console.log(err);
});

app.use(cors());

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));
//aplication/json
app.use(bodyParser.json());
app.use(cookieParser());

// =========================== 라우터 ===========================
// 1. 카테고리
app.use('/api/categories', require('./routes/category'));
// 2. 회원가입
app.use('/api/users/register', require('./routes/register'));
// 3. 회원 정보 불러오기
app.use('/api/users', require('./routes/users'));
// 4. 로그인
app.use('/api/users/login', require('./routes/login'));
// 5. 로그아웃
app.use('/api/users/logout', require('./routes/logout'));
// 6. 검색하기
app.use('/api/booktrailer/search', require('./routes/search'));

app.listen(port, () => console.log(`
=========================== port on ${port} ===========================
`));