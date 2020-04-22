function Spam(){
    console.log("spam is good");
}

function gukbob(){
    console.log("gokbob is fantastic");
}

//We can exports modules like this
module.exports.Spam = Spam;
module.exports.gukbob = gukbob;