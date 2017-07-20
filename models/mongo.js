var user = {
	uname:"13080868092",
    pwd:"123456",
    hphoto:"/images/account/userimg.png",
    sex:"male",
    birthday:"1994-4-5",
    payment:[],
    address:[]};


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.createConnection('localhost', 'smallmimall');

db.on('error', function() { console.log("error") });
db.once('open', function() {
    //1. Schema
    userSchema = new Schema({
        uname: String,
        pwd: String
    });

    detailSchema = new Schema({
        name: String,
        activity: String,
        brief: String,
        type: String,
        ram: String,
        rom: String,
        color: String,
        pic: String,
        price: Number,
        stock: Number,
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
            callback(doc[0]);
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

    db.init = function(callback){
        var detail = {
            name: "小米6",
            activity: "7月14日早10点，小米6 64GB 亮白色 首卖",
            brief: "变焦双摄，4 轴防抖 / 骁龙835 旗舰处理器，6GB 大内存，最大可选128GB 闪存 / 5.15吋 护眼屏 / 四曲面玻璃/陶瓷机身",
            type: [{name: "陶瓷尊享版",  ram: "6GB",
            rom: "128GB",
            color: "亮黑色",}],
           
            pic: "img/lightblack.jpg",
            price: "2999",
            stock: "0",
            urls1: [{ url: "img/mi61.jpg" }, { url: "img/mi62.jpg" }, { url: "img/mi63.jpg" }, { url: "img/mi64.jpg" }, { url: "img/mi65.jpg" }, { url: "img/mi66.jpg" }, { url: "img/mi67.jpg" }, { url: "img/mi68.jpg" }, { url: "img/mi69.jpg" }, { url: "img/mi610.jpg" }, { url: "img/mi611.jpg" }, { url: "img/mi612.jpg" }, { url: "img/mi613.jpg" }, { url: "img/mi614.jpg" }, { url: "img/mi615.jpg" }],
            urls2: [{ url: "img/parameter1.jpg" }, { url: "img/parameter2.jpg" }, { url: "img/parameter3.jpg" }, { url: "img/parameter4.jpg" }],
            urls3: [{ url: "img/yushou.jpg" }]
        };
        db.addDetail(detail, function(cb){
            callback(cb);
        });
    }
}


module.exports = db;