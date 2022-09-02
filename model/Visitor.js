const mysql = require("mysql");

const cnn = mysql.createConnection({
    host:'localhost',
    user:'user',
    password:'qwer1234!!',
    database:'kdt_test'
});

exports.get_visitor = (cb) => {
    var sql = 'SELECT * FROM visitor';
    cnn.query(sql, (err, rows)=>{
        if(err) throw err;
        console.log("visitors : ", rows);

        cb(rows);
    })
}

exports.post_visitor = (data, cb) => {
    var sql = `INSERT INTO visitor (name, comment) values('${data.name}','${data.comment}')`;
    cnn.query(sql, (err, result)=>{
        if(err) throw err;
        console.log("visitors : ", result);

        cb(result.insertId);
    })
}