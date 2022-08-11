const express = require("express");
const app = express();

app.set("view engine", "ejs");

// app.use( express.static( 'public' ) );
//만약, 어떤사람이 ip:port/img/cat.jpg 로 접근하면, 해당 파일을 ip:port/public/img/cat.jpg에 존재하는지 찾는다.
app.use( '/static', express.static( 'static' ) );
//만약, 어떤사람이 ip:port/static/img/cat.jpg 로 접근하면, 해당 파일을 ip:port/static/img/cat.jpg에 존재하는지 찾는다.

const port = 8000; // 3000, 8080 셋 중 하나 사용

app.get("/", (req, res)=>{
    // res.sendFile(__dirname+"/test.html");
    // var person = [
    //     {name: "윤경민",gender: "남자"},
    //     {name: "김소연",gender: "여자"}
    // ]
    // res.render("test", {per: person})
    res.render("test");
})
// localhost:8000/

app.get("/test",(req, res)=>{
    res.render("test1");
})
// localhost:8000/test

app.listen(port, ()=>{
    console.log("server open: ", port);
})