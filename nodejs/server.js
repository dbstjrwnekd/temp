//let's make simple web server 
//with simple js web module
var http = require('http');
//for function's parameters, think like python's way
//that is more effective to understand
function onRequest(req, res){
    console.log("사용자가 requst합니다"+req.url);
    res.writeHead(200,{"Context-Type":"text/plain"});
    res.write("this is server response");
    res.end();
}

console.log("running server...");
http.createServer(onRequest).listen(8888);
console.log("server run");
