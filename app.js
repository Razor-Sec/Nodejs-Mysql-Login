const express = require('express'); // For import express 
const mysql = require('mysql'); //for import express
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config({path: './.env'});

const app = express(); //start the server

const db = mysql.createConnection({
    host: process.env.db_host, //Protect db
    user: process.env.db_user,
    password: process.env.db_password,
    port: '22016',
    database: process.env.db
})

const publicDirectory = path.join(__dirname, './public') //for file like css or js
app.use(express.static(publicDirectory));

// Parse url-encode bodies (as Sent by html forms)
app.use(express.urlencoded({ extended: false}))
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(cookieParser())
console.log(__dirname); //for checking
app.set('view engine', 'hbs'); //For template we use

//Checking db
db.connect((error)=>{
    if(error){
        console.log(error)
    }else{
        console.log("Mysql Is Connected :D ")
    }
})

//app.get("/", (req, res) => { // req is basically when you want to grab something from a forum for example , res send to front end of the user
//   // res.send("<h1>Razor Page</h1>")
//   res.render('index'); // For displaying the index.hbs
//});

//app.get('/register', (req,res) => {
//    res.render("register");
//})

//Define Routes
app.use('/', require('./routes/pages'));    //Every pages in / will except the routes
app.use('/auth', require('./routes/auth'));

app.listen(8080, () =>{ //For make sure the server is on
    console.log("Start on Port 8080");
})