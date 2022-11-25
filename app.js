const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { signedCookie } = require("cookie-parser");

app.set("view engine", "ejs");

// app.use( express.static( 'public' ) );
//만약, 어떤사람이 ip:port/img/cat.jpg 로 접근하면, 해당 파일을 ip:port/public/img/cat.jpg에 존재하는지 찾는다.
app.use("/static", express.static("static"));
//만약, 어떤사람이 ip:port/static/img/cat.jpg 로 접근하면, 해당 파일을 ip:port/static/img/cat.jpg에 존재하는지 찾는다.
app.use("/uploads", express.static("uploads"));

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      /*목적지를 정해주는 함수*/
      done(null, "uploads/");
    },
    filename(req, file, done) {
      /*파일 이름을 정해주는 함수*/
      userid = req.body.id;
      const ext = path.extname(file.originalname); /*ext = 확장자를 가져온다.*/
      // done(null, path.basename(file.originalname, ext) /*파일 이름만 가져온다*/ + ext);
      done(null, userid + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 } /*파일 용량 제한 5MB*/,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser("asdf")); // 암호화할 때 사용할 문자열
app.use(
  session({
    secret: "seceret key", // 암호화할 때 쓰는 문자열 (기본값)
    resave: false, // 보통 false
    saveUninitialized: true, // 보통 true
    /*httpOnly: ,*/
    /*secure: true,*/ // true = https에서만 동작
    // cookie:
  })
);

const port = 8000; // 3000, 8080 셋 중 하나 사용

// app.get("/", (req,res)=>{
//     res.render("main");
// })

// app.get("/", (req,res)=>{
//     res.render("main2");
// })

// app.get("/", (req,res)=>{
//     res.render("test1");
// })

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

app.post("/upload", upload.single("img"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.send(req.file.filename);
});

// app.get("/get", (req,res)=>{
//     console.log(req.query);
//     res.render("main", {
//     });
// })

app.post("/get/ajax", (req, res) => {
  console.log(req.body);
  var data = {
    name: req.body.name,
  };
  res.send(data);
});

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

app.get("/get/axios", (req, res) => {
  console.log(req.query);
  res.send({
    name: req.query.name,
    gender: req.query.gender,
    birth: req.query.birth,
    month: req.query.month,
    day: req.query.day,
    interest: req.query.interest,
  });
});

app.post("/post", (req, res) => {
  console.log(req.body);
  res.render("aaaa", {
    name: req.body.name,
    gender: req.body.gender,
    birth: req.body.birth,
  });
});

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

// app.get("/", (req, res)=>{
//     res.cookie('key1', 'value1', {
//         maxAge: 10000, // ms 단위 (6000 = 1초)
//         /*expires: ,*/ //GMT 시간 설정
//         path: "/", // localhost:8000/~~~ 모든 주소에 적용
//         /*secure: true,*/ // https 에서만 (false가 기본 값)
//         /*httpOnly: true,*/ // ejs파일에서 document.cookie로 접근 불가능
//     });
//     res.render("index");
// });

// app.get("/", (req, res)=>{

//     res.render("cookie실습", {
//         cookie: req.cookies.key1
//     });
// });

app.post("/get", (req, res) => {
  res.cookie("key1", "value1", {
    maxAge: 60000, // ms 단위 (6000 = 1초)
    /*expires: ,*/ //GMT 시간 설정
    /*path: "/",*/ // localhost:8000/~~~ 모든 주소에 적용
    /*secure: true,*/ // https 에서만 (false가 기본 값)
    httpOnly: true, // ejs파일에서 document.cookie로 접근 불가능}
    /*signed:true*/
  });
  res.send(req.cookies);
});

app.get("/session", (req, res) => {
  // req.session.key = "value"
  req.session.key1 = "value1";
  console.log(req.session);
  res.render("index");
});

var info = {
  id: "a",
  pw: "123",
};

app.get("/", (req, res) => {
  if (req.session.user) {
    res.render("main3", { login: true, name: req.session.user });
  } else {
    res.render("main3", { login: false });
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/logout", (req, res) => {
  delete req.session.user;

  res.redirect("/");
});

app.post("/login", (req, res) => {
  // console.log(req.body.ID);
  // console.log(req.body.Password);
  // console.log(info.id);
  // console.log(info.pw);
  if (req.body.ID == info.id && req.body.Password == info.pw) {
    req.session.user = req.body.ID;
    res.send(true);
  } else {
    res.send(false);
  }
});

app.listen(port, () => {
  console.log("server open: ", port);
});
