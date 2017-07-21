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
    console.log(uname);

    db.queryUserByName(uname, function(user) {
        console.log(user);
        if (pwd == user.pwd) {
            req.session.user = user;
            res.render('index', { title: 'Express', fragment: 1 });
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
    var phone = req.body.phone;
    var pwd = req.body.pwd;
    var user = {
        phone: phone,
        uname: 'p_' + phone,
        pwd: pwd,
        hphoto: "/images/account/userimg.png",
        sex: "male",
        payment: [],
        address: []
    };
    console.log(user);
    db.addUser(user, function(cb) {
        if (cb == "success") {
            req.session.user = user;
            res.render('index', { title: 'Express', fragment: 1 });
        }
    })
});

router.get('/person', function(req, res, next) {
    res.render('person');
});

router.get('/forget', function(req, res, next) {
    res.send('<h1 style="font-size: 2rem">可怕，程序员竟然没写这个功能，我帮你打个电话催一下╮(╯▽╰)╭</h1>');
});

module.exports = router;