var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.createConnection('localhost', 'smallmimall');

db.on('error', function() { console.log("error") });
db.once('open', function() {
    //1. Schema
    userSchema = new Schema({
        uname: String,
        pwd: String,
        hphoto: String,
        sex: String,
        payment: Array,
        address: Array
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
        var userEntity = new userModel(user);
        //保存到数据库
        userEntity.save();
        callback('success');
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
            callback(doc[0]);
        })
    }

    db.deleteUser = function(id) {
        userModel.findById(id, function(err, doc) {
            doc.remove();
        });
    }

    db.updateUser = function(id, data) {
        userModel.findByIdAndUpdate(id, data, function(err, doc) {});
    }

    db.init = function(callback)
    {
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
            payment: [{orderId:"5160607962200971",orderState:"已完成",orderItemsPic:[{"url":"img/orderItem1.jpg"}],orderItemsName:[{"name":"小米手环 2 黑色"}],orderDate:"2016/04/22 17:46",orderPayMethod:"微信支付",orderBuyer:"张三",orderRecDate:"2016/04/23 17:46",orderRecAddr:"辽宁省沈阳市浑南新区东北大学浑南校区",orderItemNum:"1",orderItemMoney:"149"}],
            address: []
        };
         db.addUser(address, function(cb){
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

<<<<<<< HEAD
    // db.init = function(callback){
    //     var detail = {
    //         name: "小米6",
    //         activity: "7月14日早10点，小米6 64GB 亮白色 首卖",
    //         brief: "变焦双摄，4 轴防抖 / 骁龙835 旗舰处理器，6GB 大内存，最大可选128GB 闪存 / 5.15吋 护眼屏 / 四曲面玻璃/陶瓷机身",
    //         type: [{name: "陶瓷尊享版", ram: "6GB", rom: "128GB", color: "亮黑色",pic: "/img/lightblack.jpg", price: "2999", stock: "0"},
    //                {name: "全网通版", ram: "6GB", rom: "64GB", color: "亮黑色",pic: "/img/lightblack.jpg", price: "2499", stock: "2"},
    //                {name: "陶瓷尊享版", ram: "6GB", rom: "128GB", color: "亮白色",pic: "/img/lightwhite.jpg", price: "2899", stock: "3"},
    //                {name: "全网通版", ram: "6GB", rom: "128GB", color: "亮黑色",pic: "/img/lightblack.jpg", price: "2899", stock: "5"},
    //                {name: "陶瓷尊享版", ram: "6GB", rom: "64GB", color: "亮蓝色",pic: "/img/lightblue.jpg", price: "2499", stock: "0"},
    //                {name: "陶瓷尊享版", ram: "6GB", rom: "64GB", color: "亮白色",pic: "/img/lightwhite.jpg", price: "2499", stock: "9"}],
    //         urls1: [{ url: "/img/mi61.jpg" }, { url: "/img/mi62.jpg" }, { url: "/img/mi63.jpg" }, { url: "/img/mi64.jpg" }, { url: "/img/mi65.jpg" }, { url: "/img/mi66.jpg" }, { url: "/img/mi67.jpg" }, { url: "/img/mi68.jpg" }, { url: "/img/mi69.jpg" }, { url: "/img/mi610.jpg" }, { url: "/img/mi611.jpg" }, { url: "/img/mi612.jpg" }, { url: "/img/mi613.jpg" }, { url: "/img/mi614.jpg" }, { url: "/img/mi615.jpg" }],
    //         urls2: [{ url: "/img/parameter1.jpg" }, { url: "/img/parameter2.jpg" }, { url: "/img/parameter3.jpg" }, { url: "/img/parameter4.jpg" }],
    //         urls3: [{ url: "/img/yushou.jpg" }]
    //     };
    //     db.addDetail(detail, function(cb){
    //         callback(cb);
    //     });
    // }
=======
    db.init = function(callback) {
        var detail = {
            name: "小米6",
            activity: "7月14日早10点，小米6 64GB 亮白色 首卖",
            brief: "变焦双摄，4 轴防抖 / 骁龙835 旗舰处理器，6GB 大内存，最大可选128GB 闪存 / 5.15吋 护眼屏 / 四曲面玻璃/陶瓷机身",
            type: [{ name: "陶瓷尊享版", ram: "6GB", rom: "128GB", color: "亮黑色", pic: "/img/lightblack.jpg", price: "2999", stock: "0" },
                { name: "全网通版", ram: "6GB", rom: "64GB", color: "亮黑色", pic: "/img/lightblack.jpg", price: "2499", stock: "2" },
                { name: "陶瓷尊享版", ram: "6GB", rom: "128GB", color: "亮白色", pic: "/img/lightwhite.jpg", price: "2899", stock: "3" },
                { name: "全网通版", ram: "6GB", rom: "128GB", color: "亮黑色", pic: "/img/lightblack.jpg", price: "2899", stock: "5" },
                { name: "陶瓷尊享版", ram: "6GB", rom: "64GB", color: "亮蓝色", pic: "/img/lightblue.jpg", price: "2499", stock: "0" },
                { name: "陶瓷尊享版", ram: "6GB", rom: "64GB", color: "亮白色", pic: "/img/lightwhite.jpg", price: "2499", stock: "9" }
            ],
            urls1: [{ url: "/img/mi61.jpg" }, { url: "/img/mi62.jpg" }, { url: "/img/mi63.jpg" }, { url: "/img/mi64.jpg" }, { url: "/img/mi65.jpg" }, { url: "/img/mi66.jpg" }, { url: "/img/mi67.jpg" }, { url: "/img/mi68.jpg" }, { url: "/img/mi69.jpg" }, { url: "/img/mi610.jpg" }, { url: "/img/mi611.jpg" }, { url: "/img/mi612.jpg" }, { url: "/img/mi613.jpg" }, { url: "/img/mi614.jpg" }, { url: "/img/mi615.jpg" }],
            urls2: [{ url: "/img/parameter1.jpg" }, { url: "/img/parameter2.jpg" }, { url: "/img/parameter3.jpg" }, { url: "/img/parameter4.jpg" }],
            urls3: [{ url: "/img/yushou.jpg" }]
        };
        db.addDetail(detail, function(cb) {
            callback(cb);
        });
    }
>>>>>>> 2ed8daa3f63581dcdff4f2850e14aa455dfc2180
}

module.exports = db;