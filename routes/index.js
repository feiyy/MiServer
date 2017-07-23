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
        console.log("here is " + detail);
        res.render('detail', { detailName: detail.name, detailId: detailId });
    });
});

router.post('/detail/shopcart', function(req, res, next) {
    if (!req.session.user) {
        res.send('login');
    } else {
        var detail = req.body;
        db.queryUserById(req.session.user._id, function(user) {
            var shoppingcart = user.shoppingcart;
            shoppingcart.push(detail);
            db.updateUser(req.session.user._id, { shoppingcart: shoppingcart }, function(success) {
                console.log(success);
                if (success) {
                }
            });
            res.send("success");
        })
    }
});
router.post('/payment/topay', function(req, res, next) {
    if (!req.session.user) {
        res.send('login');
    } else {
        var detail = req.body;
        console.log(detail);
        db.queryUserById(req.session.user._id, function(user) {
            var payment = user.payment;
            for(var i=0;i<payment.length;i++)
            {
                if(payment[i].orderState=="待付款")
                {
                    payment[i].orderRecAddr=detail.orderRecAddr;
                    payment[i].orderRecDate=detail.orderRecDate;
                    payment[i].orderBuyer=detail.orderBuyer;
                    payment[i].orderPayMethod=detail.orderPayMethod;
                    payment[i].orderDate=detail.orderDate;
                    payment[i].orderState=detail.orderState;
                    payment[i].orderId=detail.orderId;
                    break;    
                }
            }
            db.updateUser(req.session.user._id, { payment: payment }, function(success) {
                console.log(success);
                if (success) {
                    // //成功加入数据库之后跳转之订单详情页面
                    // res.render('myorder',{uuserId: user._id});
                    //res.redirect("/myorder");
                }
            });
            res.send("success");
        })
    }
});
router.get('/payment', function(req, res, next) {
    if (!req.session.user) {
        res.render('login');
    } else {
        console.log(req.session.user._id);
        db.queryUserById(req.session.user._id, function(user) {
            console.log(user);
            res.render('payment', { userId: user._id });
        })
    }
});
router.get('/address', function(req, res, next) {
    if (!req.session.user) {
        res.render('login');
    } else {
        console.log(req.session.user._id);
        db.queryUserById(req.session.user._id, function(user) {
            console.log(user);
            res.render('address', { userId: user._id });
        })
    }
});

router.post('/address/update', function(req, res, next) {
    if (!req.session.user) {
        res.render('login');
    } else {
        console.log(req.session.user._id);
        db.queryUserById(req.session.user._id, function(user) {
            var address = user.address;
            var item = req.body;
            address[item.number].name = item.name;
            address[item.number].phone = item.phone;
            address[item.number].addr = item.addr;
            db.updateUser(req.session.user._id, { address: address }, function(success) {
                console.log(success);
                if (success) {
                    res.render("address", { userId: user._id });
                }
            });
        })
    }
});
router.get('/myorder/:id', function(req, res, next) {
    if (!req.session.user) {
        res.render('login');
    } else {
        console.log(req.session.user._id);
        db.queryUserById(req.session.user._id, function(user) {
            console.log(user);
            res.render('myorder', { userId: user._id,state:"all" });
        })
    }
});
router.post('/myorder/changestate', function(req, res, next) {
    if (!req.session.user) {
        res.send('login');
    } else {
        var detail = req.body;
        db.queryUserById(req.session.user._id, function(user) {
            var payment = user.payment;
            console.log("detail-count="+detail.count);
            payment[detail.count].orderState = "已完成";
            db.updateUser(req.session.user._id, { payment: payment }, function(success) {
                console.log(success);
                if (success) {
                    
                }
            });
            res.send("success");
        })
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
        res.render('fragments/' + 1, { login: req.session.user });
    } else if (frag_id == 4) {
        if (req.session.user) {
            res.render('fragments/' + 4, { login: req.session.user });
        } else {
            res.render('login');
        }
    } else {
        res.render('fragments/' + frag_id);
    }
});

router.get('/shopcart', function(req, res, next) {
    if (!req.session.user) {
        res.render('login');
    } else {
        db.queryUserById(req.session.user._id, function(user) {
        var details = user.shoppingcart;
        console.log(details); 
        res.render('fragments/' + 3, { details: details });
    });
    }
});

router.get('/shopcart/:id', function(req, res, next){
    db.queryUserById(req.session.user._id,function(user){
        var shoppingcart = user.shoppingcart;
        console.log(shoppingcart);
        shoppingcart.splice(req.params.id, 1);
        console.log(shoppingcart);
        db.updateUser(req.session.user._id, {shoppingcart: shoppingcart}, function(success) {
            console.log(success);
            if(success) {
                res.send("success");
            }
        });
    })
});

router.get('/clearbutton', function(req, res, next){
    db.queryUserById(req.session.user._id,function(user){
        var shoppingcart = user.shoppingcart;
        var neworder={orderId:"",orderState:"待付款",orderItemsPic:[{url:"img/orderItem1.jpg"}],orderItemsName:[{name:"小米手环 2 黑色"}],orderDate:"",orderPayMethod:"",orderBuyer:"",orderRecDate:"",orderRecAddr:"",orderItemNum:"1",orderItemMoney:"149"};
        for(index=0;index<shoppingcart.lenth;index++){
            neworder.orderItemsPic.url=shoppingcart.url;
            neworder.orderItemsName.name=shoppingcart.goodsName;
        }
        neworder.orderItemNum = $(".all_counts").value ;
        neworder.orderItemMoney = $(".all_price").value ; 

    });
});

router.get('/img/:file', function(req, res, next) {
    console.log(req.params.file);
    res.sendFile('/public/images/details/' + req.params.file, options);
});

router.get('/json/:id', function(req, res, next) {
    db.queryDetailById(req.params.id, function(detail) {
        console.log("the json detail is " + detail);
        res.send(detail);
    });
});
router.get('/order/:id', function(req, res, next) {
    db.queryUserById(req.params.id, function(detail) {
        console.log("the json detail is " + detail);
        res.send(detail);
    });
});

router.get('/init', function(req, res, next) {
    db.init(function(cb) {
        res.send(cb);
    });
})
// router.get('/addUser', function(req, res, next) {
//     db.addUser(user,function(cb) {
//         res.send(cb);
//     });
// })
module.exports = router;