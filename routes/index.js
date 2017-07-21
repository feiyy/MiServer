var express = require('express');
var router = express.Router();
var db = require("../models/mongo.js");

var options = {
    root: __dirname + '/../'
};

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express', fragment: 1 });
});

router.get('/mine', function(req, res, next) {
    res.render('index', { title: 'Express', fragment: 4 });
});

router.get('/detail/:id', function(req, res, next) {
    var detailId = req.params.id;
    db.queryDetailById(detailId, function(detail) {
        console.log(detail);
        res.render('detail', { detailName: detail.name, detailId: detailId });
    });
});

router.get('/payment', function(req, res, next) {
    res.render('payment', { detailName: '小米6' });
});

router.get('/myorder', function(req, res, next) {
    if (!req.session.user) {
        res.render('login');
    } else {
        console.log(req.session.user._id);
        res.render('myorder', { detailName: '小米6' });
    }
});

router.get('/ordernull', function(req, res, next) {
    res.render('ordernull', { detailName: '小米6' });
});

router.get('/search', function(req, res, next) {
    res.render('search', { detailName: '小米6' });
});

router.get('/fragments/:id', function(req, res, next) {
    var frag_id = req.params.id;
    if (frag_id == 1) {
        res.render('fragments/' + frag_id, { login: req.session.user });
    } else {
        res.render('fragments/' + frag_id);
    }
});

var details = [{
    name: "小米6",
    activity: "7月14日早10点，小米6 64GB 亮白色 首卖",
    brief: "变焦双摄，4 轴防抖 / 骁龙835 旗舰处理器，6GB 大内存，最大可选128GB 闪存 / 5.15吋 护眼屏 / 四曲面玻璃/陶瓷机身",
    type: "陶瓷尊享版",
    ram: "6GB",
    rom: "128GB",
    color: "亮黑色",
    pic: "img/lightblack.jpg",
    price: "2999",
    stock: "0",
    urls1: [{ url: "img/mi61.jpg" }, { url: "img/mi62.jpg" }, { url: "img/mi63.jpg" }, { url: "img/mi64.jpg" }, { url: "img/mi65.jpg" }, { url: "img/mi66.jpg" }, { url: "img/mi67.jpg" }, { url: "img/mi68.jpg" }, { url: "img/mi69.jpg" }, { url: "img/mi610.jpg" }, { url: "img/mi611.jpg" }, { url: "img/mi612.jpg" }, { url: "img/mi613.jpg" }, { url: "img/mi614.jpg" }, { url: "img/mi615.jpg" }],
    urls2: [{ url: "img/parameter1.jpg" }, { url: "img/parameter2.jpg" }, { url: "img/parameter3.jpg" }, { url: "img/parameter4.jpg" }],
    urls3: [{ url: "img/yushou.jpg" }]
}, {
    name: "小米6",
    activity: "7月14日早10点，小米6 64GB 亮白色 首卖",
    brief: "变焦双摄，4 轴防抖 / 骁龙835 旗舰处理器，6GB 大内存，最大可选128GB 闪存 / 5.15吋 护眼屏 / 四曲面玻璃/陶瓷机身",
    type: "陶瓷尊享版",
    ram: "6GB",
    rom: "128GB",
    color: "亮黑色",
    pic: "img/lightblack.jpg",
    price: "2999",
    stock: "0",
    urls1: [{ url: "img/mi61.jpg" }, { url: "img/mi62.jpg" }, { url: "img/mi63.jpg" }, { url: "img/mi64.jpg" }, { url: "img/mi65.jpg" }, { url: "img/mi66.jpg" }, { url: "img/mi67.jpg" }, { url: "img/mi68.jpg" }, { url: "img/mi69.jpg" }, { url: "img/mi610.jpg" }, { url: "img/mi611.jpg" }, { url: "img/mi612.jpg" }, { url: "img/mi613.jpg" }, { url: "img/mi614.jpg" }, { url: "img/mi615.jpg" }],
    urls2: [{ url: "img/parameter1.jpg" }, { url: "img/parameter2.jpg" }, { url: "img/parameter3.jpg" }, { url: "img/parameter4.jpg" }],
    urls3: [{ url: "img/yushou.jpg" }]
}, {
    name: "小米6",
    activity: "7月14日早10点，小米6 64GB 亮白色 首卖",
    brief: "变焦双摄，4 轴防抖 / 骁龙835 旗舰处理器，6GB 大内存，最大可选128GB 闪存 / 5.15吋 护眼屏 / 四曲面玻璃/陶瓷机身",
    type: "陶瓷尊享版",
    ram: "6GB",
    rom: "128GB",
    color: "亮黑色",
    pic: "img/lightblack.jpg",
    price: "2999",
    stock: "0",
    urls1: [{ url: "img/mi61.jpg" }, { url: "img/mi62.jpg" }, { url: "img/mi63.jpg" }, { url: "img/mi64.jpg" }, { url: "img/mi65.jpg" }, { url: "img/mi66.jpg" }, { url: "img/mi67.jpg" }, { url: "img/mi68.jpg" }, { url: "img/mi69.jpg" }, { url: "img/mi610.jpg" }, { url: "img/mi611.jpg" }, { url: "img/mi612.jpg" }, { url: "img/mi613.jpg" }, { url: "img/mi614.jpg" }, { url: "img/mi615.jpg" }],
    urls2: [{ url: "img/parameter1.jpg" }, { url: "img/parameter2.jpg" }, { url: "img/parameter3.jpg" }, { url: "img/parameter4.jpg" }],
    urls3: [{ url: "img/ yushou.jpg" }]
}];

router.get('/shopcart', function(req, res, next) {
    if (!req.session.user) {
        res.render('login');
    }
    res.render('fragments/' + 3, { details: details });
});

router.get('/img/:file', function(req, res, next) {
    console.log(req.params.file);
    res.sendFile('/public/images/details/' + req.params.file, options);
});

router.get('/json/:id', function(req, res, next) {
    // db.queryDetailById(req.params.id, function(detail){
    //     console.log(detail);
    //     res.send(detail);
    // });
    console.log(req.params.id);
    res.sendFile('/models/' + req.params.id, options);
});

router.get('/init', function(req, res, next) {
    db.init(function(cb) {
        res.send(cb);
    });
})

module.exports = router;