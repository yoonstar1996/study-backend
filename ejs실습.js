const express = require("express");
const app = express();

app.set("view engine", "ejs");



app.use('/static', express.static('static'));


const port = 3000;

app.get("/",(req,res)=>{
    res.render("실습1");
})

app.get("/test",(req,res)=>{
    res.render("move");
})

app.get("/img",(req,res)=>{
    res.render("img");
})


app.listen(port, ()=>{
    console.log("server open: ", port);
})