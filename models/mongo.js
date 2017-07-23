var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.createConnection('192.168.1.7', 'smallmimall');

db.on('error', function(doc) { console.log(doc) });
db.once('open', function() {
            //1. Schema
            userSchema = new Schema({
                uname: String,
                pwd: String,
                hphoto: String,
                sex: String,
                phone: String,
                payment: Array,
                address: Array,
                shoppingcart: Array
            });

            detailSchema = new Schema({
                name: String,
                category: String,
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

            {
                db.addUser = function(user, callback) {
                    //3. Entity
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

                db.queryUserByValue = function(value, callback) {
                    userModel.find({
                            $or: [{ uname: value }, { phone: value }, { uname: value }],
                            function(err, doc) {
                                callback(doc[0]);
                            });
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
                }

                {
                    db.addDetail = function(detail, callback) {
                        //3. Entity
                        var detailEntity = new DetailModel(detail);
                        //保存到数据库
                        detailEntity.save();
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

                    db.updateDetail = function(id, data) {
                        DetailModel.findByIdAndUpdate(id, data, function(err, doc) {});
                    }
                }
            }); module.exports = db;