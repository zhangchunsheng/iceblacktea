/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2014-01-18
 * Description: formationUpgradeDao
 */
var mysql = require('./../mysql/mysql');
var mysqlUtil = require('../../utils/mysqlUtil');

var FormationUpgradeDao = function() {

}

FormationUpgradeDao.prototype.getData = function(next) {
    var sql = "SELECT id,formationId,studyCondition,upgradeMaterial FROM seaking_formationUpgrade";
    var array = [];
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

FormationUpgradeDao.prototype.insert = function(data, next) {
    var sql = "insert into seaking_formationUpgrade set ?";
    var obj = data;
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        if(typeof next == "function")
            next(result);
    });
}

FormationUpgradeDao.prototype.truncate = function(next) {
    var sql = "truncate table seaking_formationUpgrade";
    var obj = {};
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        next(result);
    });
}

FormationUpgradeDao.prototype.update = function(formation, next) {
    var sql = "";
    var array = [];
    var obj = mysqlUtil.updateSQL("seaking_formationUpgrade", formation);
    sql = obj.sql;
    array = obj.array;
    console.log(sql);
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

module.exports = new FormationUpgradeDao();