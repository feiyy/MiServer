var express = require('express');
var router = express.Router();
var db = require('../models/mongo.js');

var formidable = require('formidable'),
    fs = require('fs'),
    TITLE = 'formidable上传示例',
    AVATAR_UPLOAD_FOLDER = '/avatar/';

/* 图片上传路由 */
router.post('/uploader', function(req, res) {

  var form = new formidable.IncomingForm();   //创建上传表单
  form.encoding = 'utf-8';        //设置编辑
  form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;     //设置上传目录
  form.keepExtensions = true;     //保留后缀
  form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

  form.parse(req, function(err, fields, files) {

    if (err) {
      res.locals.error = err;
      res.render('index', { title: TITLE });
      return;
    }
    console.log(files);

    console.log(files.photo);  

    var extName = '';  //后缀名
    switch (files.photo.type) {
      case 'image/pjpeg':
        extName = 'jpg';
        break;
      case 'image/jpeg':
        extName = 'jpg';
        break;
      case 'image/png':
        extName = 'png';
        break;
      case 'image/x-png':
        extName = 'png';
        break;
    }

    console.log(extName);

    if(extName.length == 0){
      res.locals.error = '只支持png和jpg格式图片';
      res.render('index', { title: TITLE });
      return;
    }

    var avatarName = req.session.user._id + '.' + extName;
    //图片写入地址；
    var newPath = form.uploadDir + avatarName;
    fs.unlink(newPath,function(){
        fs.renameSync(files.photo.path, newPath);  //重命名
        db.updateUser(req.session.user._id, {hphoto: "/avatar/" + avatarName}, function(success){
            res.send(success);
        })
    })
  });
});

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
    db.queryUserByValue(uname, function(user) {
        if (user && pwd == user.pwd) {
            req.session.user = user;
            res.render('index', { fragment: 1 });
        } else {
            res.render('login');
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
        sex: "男",
        payment: [],
        address: []
    };
 
    db.addUser(user, function(cb) {
        if (cb == "success") {
            req.session.user = user;
            res.render('index', { title: 'Express', fragment: 1 });
        }
    })
});

router.get('/person', function(req, res, next) {
    db.queryUserById(req.session.user._id, function(user) {
      
        res.render('person', { person: user });
    });
});

router.get('/forget', function(req, res, next) {
    res.send('<h1 style="font-size: 2rem">可怕，程序员竟然没写这个功能，我帮你打个电话催一下╮(╯▽╰)╭</h1>');
});

router.post('/changeuname', function(req, res, next) {
    
    if (!req.session.user) {
        res.send('login');
    } else {
        db.updateUser(req.session.user._id, { uname: req.body.name }, function(success) {
            if (success) {
                res.send('person');
            }
        })
    }
});


router.post('/changesex', function(req, res, next) {
    if (!req.session.user) {
        res.send('login');
    } else {
        db.updateUser(req.session.user._id, { sex: req.body.sex }, function(success) {
            if (success) {
                res.send('person');
            }
        })
    }
});

router.post('/changepwd', function(req, res, next) {
    if (!req.session.user) {
        res.send('login');
    } else {
        db.updateUser(req.session.user._id, { pwd: req.body.pwd }, function(success) {
            if (success) {
                res.send('person');
            }
        })
    }
});

router.get('/logout', function(req, res, next) {
    delete req.session.user;
    res.render('index', { fragment: 1 });
});

module.exports = router;