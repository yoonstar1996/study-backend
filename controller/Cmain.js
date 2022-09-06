const Test = require("../model/Test");

exports.main = (req, res) => {
    res.render("main");
}

exports.login = (req,res) => {
    var info = Test.login();
    // console.log(req.body.ID);
    // console.log(req.body.Password);
    // console.log(info.id);
    // console.log(info.pw);

    if(req.body.ID == info.id && req.body.Password == info.pw){
        res.send(info.id + '님 환영합니다');
    } else {
        res.send('로그인 실패');
    }
}