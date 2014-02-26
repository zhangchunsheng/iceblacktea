/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2014-02-11
 * Description: altarDao
 */
var mysql = require('./../mysql/mysql');
var mysqlUtil = require('../../utils/mysqlUtil');

var AltarDao = function() {

}

AltarDao.prototype.getData = function(next) {
    var sql = "SELECT id,altarId,altarName name,heros FROM seaking_altar";
    var array = [];
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

AltarDao.prototype.getDatas = function(next) {
    var sql = "SELECT id,altarId,altarName name,heros,heroRandoms,totalRandomNum,refrigerationTime,extractionCost,loyalty FROM seaking_altar";
    var array = [];
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

AltarDao.prototype.insert = function(data, next) {
    var sql = "insert into seaking_altar set ?";
    var obj = data;
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        if(typeof next == "function")
            next(result);
    });
}

AltarDao.prototype.truncate = function(next) {
    var sql = "truncate table seaking_altar";
    var obj = {};
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        next(result);
    });
}

AltarDao.prototype.update = function(altar, next) {
    var sql = "";
    var array = [];
    var obj = mysqlUtil.updateSQL("seaking_altar", altar);
    sql = obj.sql;
    array = obj.array;
    console.log(sql);
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

module.exports = new AltarDao();