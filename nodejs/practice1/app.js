var dog = {
    name: "poot",
    age: 7
};

console.log(dog);
console.log("nodejs is server side js runtime");
console.log("we can use js in server side..");
console.log("now I can see.. js... ha...");

//module => 여러가지 기능을 모아놓고 사용할 수 있게
//만들어 놓은 것. 생산성이 매우 높아진다.
//모듈이 잘 되어있는 언어들이 잘나가는듯..
//하긴 파이썬도...
//js에선 module.exports를 이용해서 모듈을 지정해주는 방식
//사용딴에선 require로 받음

//we can use module with keyword require
var food = require("./food");
//we can use food's function like this
food.gukbob();
food.Spam();