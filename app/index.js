const mysql = require('mysql');
const express = require('express');
const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL Database');
});

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World! Node.js is running!');
});

app.get('/users',(req,res)=>{
  db.query("select * from users",(err,result)=>{
    if(err){
      res.send("got the Error !"+e);
      return ;
    }
    res.send(result);
  })
});

var base64 = "";
app.get('/printreceipt',(req,res)=>{
  res.send(base64);
});

app.post('/printreceipt', (req, res) => {
  console.log("POST request to /printreceipt");
  if (!req.body.base64) {
    return res.status(400).send("Base64 data is required");
  }
  base64 = {"print recipt":req.body.base64};  // Store the base64 data
  res.send("Successfully done!!");
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});

