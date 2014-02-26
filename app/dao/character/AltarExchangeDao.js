/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2014-02-17
 * Description: altarExchangeDao
 */
var mysql = require('./../mysql/mysql');
var mysqlUtil = require('../../utils/mysqlUtil');

var AltarExchangeDao = function() {

}

AltarExchangeDao.prototype.getData = function(next) {
    var sql = "SELECT id,heroId,needLoyalty FROM seaking_altar_exchange";
    var array = [];
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

AltarExchangeDao.prototype.insert = function(data, next) {
    var sql = "insert into seaking_altar_exchange set ?";
    var obj = data;
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        if(typeof next == "function")
            next(result);
    });
}

AltarExchangeDao.prototype.truncate = function(next) {
    var sql = "truncate table seaking_altar_exchange";
    var obj = {};
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        next(result);
    });
}

AltarExchangeDao.prototype.update = function(altar, next) {
    var sql = "";
    var array = [];
    var obj = mysqlUtil.updateSQL("seaking_altar_exchange", altar);
    sql = obj.sql;
    array = obj.array;
    console.log(sql);
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

module.exports = new AltarExchangeDao();