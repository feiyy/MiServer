var user = {
    phone: "",
    uname: "13080868092",
    pwd: "123456",
    hphoto: "/images/account/userimg.png",
    sex: "male",
    payment: [],
    address: []
};
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.createConnection('localhost', 'smallmimall');

db.on('error', function(doc) { console.log(doc) });
db.once('open', function() {
    //1. Schema
    userSchema = new Schema({
        uname: String,
        pwd: String,
        hphoto: String,
        sex: String,
        payment: Array,
        address: Array,
        shoppingcart: Array
    });

    detailSchema = new Schema({
        name: String,
        activity: String,
        brief: String,
        type: Array,
        urls1: Array,
        urls2: Array,
        urls3: Array
    });

    //2. Model 
    userModel = db.model('User', userSchema);
    DetailModel = db.model('Detail', detailSchema);
    // queryUser();
});

{
    db.addUser = function(user, callback) {
        //3. Entity
        console.log("come in");
        var userEntity = new userModel(user);
        //保存到数据库
        userEntity.save();
        callback('succeed');
    }

    db.queryUser = function(callback) {
        var query = userModel.find({});
        query.exec(function(err, docs) {
            callback(docs);
        });
    }

    db.queryUserByName = function(name, callback) {
        userModel.find({ uname: name }, function(err, doc) {
            callback(doc[0]);
        })
    }

    db.queryUserById = function(id, callback) {
        userModel.findById(id, function(err, doc) {
            callback(doc);
        })
    }

    db.deleteUser = function(id) {
        userModel.findById(id, function(err, doc) {
            doc.remove();
        });
    }

    db.updateUser = function(id, data, callback) {
        userModel.findByIdAndUpdate(id, data, function(err, doc) {
            callback(!err);
        });
    }

    db.init = function(callback) {
        var address = {
            // name: "小米6",
            // activity: "7月14日早10点，小米6 64GB 亮白色 首卖",
            // brief: "变焦双摄，4 轴防抖 / 骁龙835 旗舰处理器，6GB 大内存，最大可选128GB 闪存 / 5.15吋 护眼屏 / 四曲面玻璃/陶瓷机身",
            // type: [{name: "陶瓷尊享版", ram: "6GB", rom: "128GB", color: "亮黑色",pic: "/img/lightblack.jpg", price: "2999", stock: "0"},
            //        {name: "全网通版", ram: "6GB", rom: "64GB", color: "亮黑色",pic: "/img/lightblack.jpg", price: "2499", stock: "2"},
            //        {name: "陶瓷尊享版", ram: "6GB", rom: "128GB", color: "亮白色",pic: "/img/lightwhite.jpg", price: "2899", stock: "3"},
            //        {name: "全网通版", ram: "6GB", rom: "128GB", color: "亮黑色",pic: "/img/lightblack.jpg", price: "2899", stock: "5"},
            //        {name: "陶瓷尊享版", ram: "6GB", rom: "64GB", color: "亮蓝色",pic: "/img/lightblue.jpg", price: "2499", stock: "0"},
            //        {name: "陶瓷尊享版", ram: "6GB", rom: "64GB", color: "亮白色",pic: "/img/lightwhite.jpg", price: "2499", stock: "9"}],
            // urls1: [{ url: "/img/mi61.jpg" }, { url: "/img/mi62.jpg" }, { url: "/img/mi63.jpg" }, { url: "/img/mi64.jpg" }, { url: "/img/mi65.jpg" }, { url: "/img/mi66.jpg" }, { url: "/img/mi67.jpg" }, { url: "/img/mi68.jpg" }, { url: "/img/mi69.jpg" }, { url: "/img/mi610.jpg" }, { url: "/img/mi611.jpg" }, { url: "/img/mi612.jpg" }, { url: "/img/mi613.jpg" }, { url: "/img/mi614.jpg" }, { url: "/img/mi615.jpg" }],
            // urls2: [{ url: "/img/parameter1.jpg" }, { url: "/img/parameter2.jpg" }, { url: "/img/parameter3.jpg" }, { url: "/img/parameter4.jpg" }],
            // urls3: [{ url: "/img/yushou.jpg" }]
            uname: "张三",
            pwd: "123",
            hphoto: "",
            sex: "男",
            shoppingcart: [{ goodsId: "1", goodsName: "小米随身wifi", goodsPrice: "19.00", goodsCount: "2", url: "/img/lightblack.jpg" },
                { goodsId: "2", goodsName: "米兔故事机", goodsPrice: "149.00", goodsCount: "4", url: "/img/lightblack.jpg" }
            ],
            payment: [{ orderId: "5160607962200971", orderState: "已完成", orderItemsPic: [{ url: "img/orderItem1.jpg" }], orderItemsName: [{ name: "小米手环 2 黑色" }], orderDate: "2016/04/22 17:46", orderPayMethod: "微信支付", orderBuyer: "张三", orderRecDate: "2016/04/23 17:46", orderRecAddr: "辽宁省沈阳市浑南新区东北大学浑南校区", orderItemNum: "1", orderItemMoney: "149" },
                { orderId: "232456786543333", orderState: "已完成", orderItemsPic: [{ url: "img/orderItem21.jpg" }, { url: "img/orderItem22.jpg" }, { url: "img/orderItem23.jpg" }], orderItemsName: [{ name: "小米手环 石墨黑" }, { name: "红米Note 2 移动版 灰色 16GB" }, { name: "小米礼品袋 透明" }], orderDate: "2016/04/22 17:46", orderPayMethod: "微信支付", orderBuyer: "张三", orderRecDate: "2015/09/21 14:11", orderRecAddr: "辽宁省沈阳市浑南新区东北大学浑南校区", orderItemNum: "3", orderItemMoney: "869" },
                { orderId: "232456786543333", orderState: "代付款", orderItemsPic: [{ url: "img/orderItem21.jpg" }, { url: "img/orderItem22.jpg" }, { url: "img/orderItem23.jpg" }], orderItemsName: [{ name: "小米手环 石墨黑" }, { name: "红米Note 2 移动版 灰色 16GB" }, { name: "小米礼品袋 透明" }], orderDate: "", orderPayMethod: "", orderBuyer: "", orderRecDate: "", orderRecAddr: "", orderItemNum: "3", orderItemMoney: "869" }
            ],
            address: [{ name: "张三", phone: "177****1234", addr: "辽宁省沈阳市浑南新区东北大学浑南校区" },
                { name: "李四", phone: "172****3456", addr: "广东省深圳市南山区西丽镇宝珠花园" },
                { name: "王五", phone: "176****5678", addr: "湖北省武汉市洪山区东方雅苑二期" }
            ],
        };
        db.addUser(address, function(cb) {
            callback(cb);
        });
    }
}

{
    db.addDetail = function(Detail, callback) {
        //3. Entity
        var DetailEntity = new DetailModel(Detail);
        //保存到数据库
        DetailEntity.save();
        callback('success');
    }

    db.queryDetail = function(callback) {
        var query = DetailModel.find({});
        query.exec(function(err, docs) {
            callback(docs);
        });
    }

    db.queryDetailByName = function(name, callback) {
        DetailModel.find({ name: name }, function(err, doc) {
            callback(doc[0]);
        })
    }

    db.queryDetailById = function(id, callback) {
        DetailModel.findById(id, function(err, doc) {
            // console.log(doc);
            callback(doc);
        })
    }

    db.deleteDetail = function(id) {
        DetailModel.findById(id, function(err, doc) {
            doc.remove();
        });
    }

    //{price: 200}
    db.updateDetail = function(id, data) {
            DetailModel.findByIdAndUpdate(id, data, function(err, doc) {});
        }
        // db.init = function(callback) {
        //     var detail = {
        //         name: "小米6",
        //         activity: "7月14日早10点，小米6 64GB 亮白色 首卖",
        //         brief: "变焦双摄，4 轴防抖 / 骁龙835 旗舰处理器，6GB 大内存，最大可选128GB 闪存 / 5.15吋 护眼屏 / 四曲面玻璃/陶瓷机身",
        //         type: [{ name: "陶瓷尊享版", ram: "6GB", rom: "128GB", color: "亮黑色", pic: "/img/lightblack.jpg", price: "2999", stock: "0" },
        //             { name: "全网通版", ram: "6GB", rom: "64GB", color: "亮黑色", pic: "/img/lightblack.jpg", price: "2499", stock: "2" },
        //             { name: "陶瓷尊享版", ram: "6GB", rom: "128GB", color: "亮白色", pic: "/img/lightwhite.jpg", price: "2899", stock: "3" },
        //             { name: "全网通版", ram: "6GB", rom: "128GB", color: "亮黑色", pic: "/img/lightblack.jpg", price: "2899", stock: "5" },
        //             { name: "陶瓷尊享版", ram: "6GB", rom: "64GB", color: "亮蓝色", pic: "/img/lightblue.jpg", price: "2499", stock: "0" },
        //             { name: "陶瓷尊享版", ram: "6GB", rom: "64GB", color: "亮白色", pic: "/img/lightwhite.jpg", price: "2499", stock: "9" }
        //         ],
        //         urls1: [{ url: "/img/mi61.jpg" }, { url: "/img/mi62.jpg" }, { url: "/img/mi63.jpg" }, { url: "/img/mi64.jpg" }, { url: "/img/mi65.jpg" }, { url: "/img/mi66.jpg" }, { url: "/img/mi67.jpg" }, { url: "/img/mi68.jpg" }, { url: "/img/mi69.jpg" }, { url: "/img/mi610.jpg" }, { url: "/img/mi611.jpg" }, { url: "/img/mi612.jpg" }, { url: "/img/mi613.jpg" }, { url: "/img/mi614.jpg" }, { url: "/img/mi615.jpg" }],
        //         urls2: [{ url: "/img/parameter1.jpg" }, { url: "/img/parameter2.jpg" }, { url: "/img/parameter3.jpg" }, { url: "/img/parameter4.jpg" }],
        //         urls3: [{ url: "/img/yushou.jpg" }]
        //     };
        //     db.addDetail(detail, function(cb) {
        //         callback(cb);
        //     });
        // }
}

module.exports = db;