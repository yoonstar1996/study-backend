const express = require("express");
const app = express();
const port = 8000;

app.set("view engine", "ejs");

app.use("/static", express.static(__dirname+"/static"));
app.use(express.urlencoded({ extended : false}));
app.use(express.json());

const router = require("./routes/index");
app.use('/', router);

app.listen(port, ()=>{
    console.log("server open: ", port);
});