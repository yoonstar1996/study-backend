const Test = require("../model/Test");

exports.main = (req, res) => {
    res.render("main");
}

exports.login = (req,res) => {
    var info = Test.login();
    var user3 = Test.users();
    // console.log(req.body.ID);
    // console.log(req.body.Password);
    // console.log(info.id);
    // console.log(info.pw);

    if(req.body.ID == user3.id && req.body.Password == user3.pw){
        res.send(user3.name + '님 환영합니다');
    } else {
        res.send('로그인 실패');
    }
}