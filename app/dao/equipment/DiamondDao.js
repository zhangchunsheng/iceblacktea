/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-12-18
 * Description: diamondDao
 */
var mysql = require('./../mysql/mysql');
var mysqlUtil = require('../../utils/mysqlUtil');

var DiamondDao = function() {

}

DiamondDao.prototype.getData = function(next) {
    var sql = "SELECT id,diamondId,`name`,icon,quality,attrId,attrValue,price,overlayNum,pileNum FROM seaking_diamond";
    var array = [];
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

DiamondDao.prototype.insert = function(data, next) {
    var sql = "insert into seaking_diamond set ?";
    var obj = data;
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        if(typeof next == "function")
            next(result);
    });
}

DiamondDao.prototype.truncate = function(next) {
    var sql = "truncate table seaking_diamond";
    var obj = {};
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        next(result);
    });
}

DiamondDao.prototype.update = function(equipment, next) {
    var sql = "";
    var array = [];
    var obj = mysqlUtil.updateSQL("seaking_diamond", equipment);
    sql = obj.sql;
    array = obj.array;
    console.log(sql);
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

module.exports = new DiamondDao();