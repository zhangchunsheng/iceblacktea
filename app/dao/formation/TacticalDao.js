/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-12-09
 * Description: tactialDao
 */
var mysql = require('./../mysql/mysql');
var mysqlUtil = require('../../utils/mysqlUtil');

var TacticalDao = function() {

}

TacticalDao.prototype.getData = function(next) {
    var sql = "SELECT id,tacticalId,tacticalName name,positions,`date`,bz FROM seaking_tactical";
    var array = [];
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

TacticalDao.prototype.insert = function(data, next) {
    var sql = "insert into seaking_tactical set ?";
    var obj = data;
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        if(typeof next == "function")
            next(result);
    });
}

TacticalDao.prototype.truncate = function(next) {
    var sql = "truncate table seaking_tactical";
    var obj = {};
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        next(result);
    });
}

TacticalDao.prototype.update = function(tactical, next) {
    var sql = "";
    var array = [];
    var obj = mysqlUtil.updateSQL("seaking_tactical", tactical);
    sql = obj.sql;
    array = obj.array;
    console.log(sql);
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

module.exports = new TacticalDao();