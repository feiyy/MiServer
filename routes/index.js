var express = require('express');
var router = express.Router();

var options = {
    root: __dirname + '/../'
};

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express', fragment: 1 });
});

router.get('/detail', function(req, res, next) {
    res.render('detail', { detailName: '小米6' });
});

router.get('/payment', function(req, res, next) {
    res.render('payment', { detailName: '小米6' });
});

router.get('/myorder', function(req, res, next) {
    res.render('myorder', { detailName: '小米6' });
});

router.get('/ordernull', function(req, res, next) {
    res.render('ordernull', { detailName: '小米6' });
});

router.get('/fragments/:id', function(req, res, next) {
    var frag_id = req.params.id;
    if (frag_id == 1) {
        res.render('fragments/' + frag_id, { login: false });
    } else {
        res.render('fragments/' + frag_id);
    }
});

router.get('/shopcart', function(req, res, next) {
    res.render('fragments/' + 3);
});

router.get('/img/:file', function(req, res, next) {
    console.log(req.params.file);
    res.sendFile('/public/images/details/' + req.params.file, options);
});

router.get('/json/:file', function(req, res, next) {
    console.log(req.params.file);
    res.sendFile('/models/' + req.params.file, options);
});

module.exports = router;