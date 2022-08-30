const express = require("express");
const app = express();

app.set("view engine", "ejs");

// app.use( express.static( 'public' ) );
//만약, 어떤사람이 ip:port/img/cat.jpg 로 접근하면, 해당 파일을 ip:port/public/img/cat.jpg에 존재하는지 찾는다.
app.use( '/static', express.static( 'static' ) );
//만약, 어떤사람이 ip:port/static/img/cat.jpg 로 접근하면, 해당 파일을 ip:port/static/img/cat.jpg에 존재하는지 찾는다.

app.use(express.urlencoded({extended:false}));
app.use(express.json());

const port = 8000; // 3000, 8080 셋 중 하나 사용

app.get("/", (req,res)=>{
    res.render("main");
})

app.get("/get", (req,res)=>{
    console.log(req.query);
    res.render("main", {
    });
})

app.post("/get/ajax", (req,res)=>{
    console.log(req.body);
    var data = {
        name: req.body.name
    }
    res.send(data);
})

// var id = "codingon";
// var pw = "123456";

// app.post("/get/axios", (req,res)=>{
//     console.log(req.body.ID);
//     console.log(req.body.Password);
//     console.log(id);
//     console.log(pw);
//     if(req.body.ID == id && req.body.Password == pw){
//         res.send("로그인 성공");
//     }
//     else{
//         res.send("로그인 실패");
//     }
// })

app.get("/get/axios", (req,res)=>{
    console.log(req.require);
    res.send(data, {
        name:req.require.name,
        gender:req.require.gender,
        birth:req.require.birth,
        month:req.require.month,
        day:req.require.day
    });
})

app.post("/post", (req,res)=>{
    console.log(req.body);
    res.render("aaaa", {
        name: req.body.name,
        gender: req.body.gender,
        birth: req.body.birth
    });
})

// app.get("/", (req, res)=>{
    // res.sendFile(__dirname+"/test.html");
    // var person = [
    //     {name: "윤경민",gender: "남자"},
    //     {name: "김소연",gender: "여자"}
    // ]
    // res.render("test", {per: person})
    // res.render("test");
// })
// localhost:8000/

// app.get("/test",(req, res)=>{
    // res.render("test1");
// })
// localhost:8000/test

app.listen(port, ()=>{
    console.log("server open: ", port);
})