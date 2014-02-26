/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-12-18
 * Description: forgeUpgradeDao
 */
var mysql = require('./../mysql/mysql');
var mysqlUtil = require('../../utils/mysqlUtil');

var ForgeUpgradeDao = function() {

}

ForgeUpgradeDao.prototype.getData = function(next) {
    var sql = "SELECT id,equipmentId,forgeUpgradeMaterial FROM seaking_forge";
    var array = [];
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

ForgeUpgradeDao.prototype.insert = function(data, next) {
    var sql = "insert into seaking_forge set ?";
    var obj = data;
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        if(typeof next == "function")
            next(result);
    });
}

ForgeUpgradeDao.prototype.truncate = function(next) {
    var sql = "truncate table seaking_forge";
    var obj = {};
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        next(result);
    });
}

ForgeUpgradeDao.prototype.update = function(equipment, next) {
    var sql = "";
    var array = [];
    var obj = mysqlUtil.updateSQL("seaking_forge", equipment);
    sql = obj.sql;
    array = obj.array;
    console.log(sql);
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

module.exports = new ForgeUpgradeDao();