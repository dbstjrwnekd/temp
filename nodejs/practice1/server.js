//let's make simple web server 
//with simple js web module
var http = require('http');
var fs = require('fs');

//Error Message
function send404Response(res){
    res.writeHead(404,{"Content-Type":"text/plain"});
    res.write("404 not found");
    res.end();
}


//for function's parameters, think like python's way
//that is more effective to understand
function onRequest(req, res){
    if(req.method =="GET" && req.url =="/"){
        res.writeHead(200,{"Context-Type":"text/plain"});
        fs.createReadStream("./index.html").pipe(res);
    }else{
        send404Response(res);
    }
}

console.log("running server...");
http.createServer(onRequest).listen(8888);
console.log("server run");
