var express = require('express');
var router = express.Router();
var db = require('../models/mongo.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
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
            // res.render("index", { username: "", err: "登录失败", users: arr });
        }
    });
});

module.exports = router;