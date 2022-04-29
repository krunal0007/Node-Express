const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;

let app = express();
app.use(bodyParser.json());

//MySQL details
var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "node",
  multipleStatements: true,
});

conn.connect((err) => {
  if (!err) console.log("Connection Established Successfully");
  else console.log("Connection Failed!" + JSON.stringify(err, undefined, 2));
});

app.listen(port, () => console.log(`Listening on port ${port}..`));

// Get all data
app.get('/', (req,res)=>{
    conn.query('SELECT * FROM crud', (err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
        }
    });
});

// Get specific id
app.get('/:id', (req,res)=>{
    conn.query('SELECT * FROM crud WHERE id = ?',[req.params.id], (err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
        }
    });
});

// Insert Data
app.post('/add',(req,res)=>{
    let person = req.body;
    let sql = `INSERT INTO crud (name, email) VALUES ('${person.name}','${person.email}')`;
    // console.log(sql);
    conn.query(sql,(err,results)=>{
        if (err) throw (err);
        res.send("Data sent...");
    });
});

app.put('/update',(req,res)=>{
    let person = req.body;
    let sql = `UPDATE crud SET name = "${person.name}", email = "${person.email}" WHERE id = ${person.id}`;
    // console.log("sql",sql);
    conn.query(sql,(err,results)=>{
        if (err) throw (err);
        res.send("Data Updated...");
    });
});

app.delete('/delete/:id',(req,res)=>{
    conn.query('DELETE  FROM crud WHERE id = ?',[req.params.id], (err,rows,fields)=>{
        if(!err){
            res.send("deleted....");
        }else{
            console.log(err);
        }
    });
});