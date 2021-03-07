const express = require('express');

const router = express.Router();

router.get("/", (req,res)=> {
    res.render('index');
});

router.get("/register", (req,res) => {
    res.render('register');
});
router.get("/login", (req,res) => {
    res.render('login');
});

module.exports = router; //for export these router that we created and that we are giving in here for ourpages