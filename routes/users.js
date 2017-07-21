var express = require('express');
var router = express.Router();
var db = require('../models/mongo.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/address', function(req, res, next) {
    res.render('address');
});

router.get('/login', function(req, res, next) {
    res.render('login');
});

router.post('/login', function(req, res, next) {
    //获取表单数据
    var uname = req.body.user;
    var pwd = req.body.pwd;

    user = db.queryUserByName(uname, function(user) {
        console.log(user);
        if (pwd == user.pwd) {
            console.log(uname + " login: success");
        } else {
            console.log(uname + " login: fail");
        }
    });
});

router.get('/register', function(req, res, next) {
    res.render('register');
});

router.post('/register', function(req, res, next) {
    //获取表单数据
    var uname = req.body.user;
    var pwd = req.body.pwd;
    var user = {
        uname: uname,
        pwd: pwd
    };
    console.log(user);
    user = db.queryUserByName(uname, function(user) {
        console.log(user);
        if (pwd == user.pwd) {
            console.log(uname + " login: success");
        } else {
            console.log(uname + " login: fail");
        }
    });
});

router.get('/person', function(req, res, next) {
    res.render('person');
});

router.get('/login', function(req, res, next) {
    res.render('login');
});





module.exports = router;