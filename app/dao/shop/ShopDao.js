/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-12-09
 * Description: tactialDao
 */
var mysql = require('./../mysql/mysql');
var mysqlUtil = require('../../utils/mysqlUtil');

var ShopDao = function() {

}

ShopDao.prototype.getData = function(next) {
    var sql = "SELECT id,shopId,npcId,shopName `name`,shopData FROM seaking_shop";
    var array = [];
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

ShopDao.prototype.insert = function(data, next) {
    var sql = "insert into seaking_shop set ?";
    var obj = data;
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        if(typeof next == "function")
            next(result);
    });
}

ShopDao.prototype.truncate = function(next) {
    var sql = "truncate table seaking_shop";
    var obj = {};
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        next(result);
    });
}

ShopDao.prototype.update = function(formation, next) {
    var sql = "";
    var array = [];
    var obj = mysqlUtil.updateSQL("seaking_shop", formation);
    sql = obj.sql;
    array = obj.array;
    console.log(sql);
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

module.exports = new ShopDao();