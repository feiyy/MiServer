var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.createConnection('10.25.53.88', 'smallmimall');

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
        urls1: Object,
        urls2: Object,
        urls3: Object
    });

    //2. Model 
    userModel = db.model('User', userSchema);
    detailModel = db.model('Detail', detailSchema);
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
        DetailModel.find({ uname: name }, function(err, doc) {
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

    db.updateDetail = function(id, data) {
        DetailModel.findByIdAndUpdate(id, data, function(err, doc) {});
    }
}


module.exports = db;