const express = require("express");
const app = express();

const port = 8000; // 3000, 8080 셋 중 하나 사용

app.get("/", (req, res)=>{
    res.sendFile(__dirname+"/test.html");
})

app.listen(port, ()=>{
    console.log("server open: ", port);
})