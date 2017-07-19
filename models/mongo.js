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
        dname: String,
        name: String,
        activity: String,
        brief: String,
        type: String,
        ram: String,
        rom: String,
        color: String,
        pic: String,
        price: String,
        stock: String,
        urls1: String,
        urls2: String,
        urls3: String
    });

    //2. Model 
    userModel = db.model('User', userSchema);
    // queryUser();
});

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

module.exports = db;