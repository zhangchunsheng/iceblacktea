/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2014-02-13
 * Description: soulFusionDao
 */
var mysql = require('./../mysql/mysql');
var mysqlUtil = require('../../utils/mysqlUtil');

var SoulFusionDao = function() {

}

SoulFusionDao.prototype.getData = function(next) {
    var sql = "SELECT id,trait,starLevel,soulName `name`,upgradeStarNeedExp,experience FROM seaking_soulFusion";
    var array = [];
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

SoulFusionDao.prototype.insert = function(data, next) {
    var sql = "insert into seaking_soulFusion set ?";
    var obj = data;
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        if(typeof next == "function")
            next(result);
    });
}

SoulFusionDao.prototype.truncate = function(next) {
    var sql = "truncate table seaking_soulFusion";
    var obj = {};
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        next(result);
    });
}

SoulFusionDao.prototype.update = function(soulFusion, next) {
    var sql = "";
    var array = [];
    var obj = mysqlUtil.updateSQL("seaking_soulFusion", soulFusion);
    sql = obj.sql;
    array = obj.array;
    console.log(sql);
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

module.exports = new SoulFusionDao();