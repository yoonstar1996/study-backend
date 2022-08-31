const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
app.set("view engine", "ejs");

// app.use( express.static( 'public' ) );
//만약, 어떤사람이 ip:port/img/cat.jpg 로 접근하면, 해당 파일을 ip:port/public/img/cat.jpg에 존재하는지 찾는다.
app.use( '/static', express.static( 'static' ) );
//만약, 어떤사람이 ip:port/static/img/cat.jpg 로 접근하면, 해당 파일을 ip:port/static/img/cat.jpg에 존재하는지 찾는다.
app.use( '/uploads', express.static( 'uploads' ) );

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done){ /*목적지를 정해주는 함수*/
            done( null, 'uploads/');
        },
        filename(req, file, done) {  /*파일 이름을 정해주는 함수*/
            userid = req.body.id;
            const ext = path.extname(file.originalname); /*ext = 확장자를 가져온다.*/
            // done(null, path.basename(file.originalname, ext) /*파일 이름만 가져온다*/ + ext);
            done(null, userid + ext);
        },
    }),
    limits: { fileSize: 5*1024*1024 }, /*파일 용량 제한 5MB*/
})


app.use(express.urlencoded({extended:false}));
app.use(express.json());


const port = 8000; // 3000, 8080 셋 중 하나 사용

// app.get("/", (req,res)=>{
    //     res.render("main");
    // })
    
app.get("/", (req,res)=>{
    res.render("main2");
})

// app.post("/upload", upload.single("userfile"), (req, res)=>{ /**single메소드 사용시 한개 업로드 가능 */
    // console.log(req.body);
    // console.log(req.file);
    // res.send("업로드 성공");
// })

// app.post("/upload", upload.array("userfile"), (req, res)=>{ /**array메소드 사용시 여러개 업로드 가능 */
//     console.log(req.body);
//     console.log(req.files);
//     res.send("업로드 성공");
// })

// app.post("/upload", upload.fields([{name:"userfile"},{name:"userfile1"}]), (req, res)=>{ /**array메소드 사용시 여러개 업로드 가능 */
//     console.log(req.body);
//     console.log(req.files);
//     res.send("업로드 성공");
// })

// app.post("/upload", upload.single("userfile"), (req, res)=>{
//     console.log(req.body);
//     console.log(req.files);
//     res.send("업로드 성공");
// })



app.post("/upload", upload.single("img"), (req, res)=>{
    console.log(req.body);
    console.log(req.file);
    res.send(req.file.filename);
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
    console.log(req.query);
    res.send({
        name:req.query.name,
        gender:req.query.gender,
        birth:req.query.birth,
        month:req.query.month,
        day:req.query.day,
        interest:req.query.interest
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