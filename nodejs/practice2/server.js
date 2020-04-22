//http, connect, express modules
var connect = require('connect');
var http = require('http');

var app = connect();

app.use("/about",about);
app.use("/email",email);

function about(req, res){
    console.log("about page request");
}

function email(req,res){
    console.log("email page request");
}

http.createServer(app).listen(8888);
console.log("server run");