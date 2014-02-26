/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-12-09
 * Description: formationDao
 */
var mysql = require('./../mysql/mysql');
var mysqlUtil = require('../../utils/mysqlUtil');

var FormationDao = function() {

}

FormationDao.prototype.getData = function(next) {
    var sql = "SELECT id,formationId,formationName `name`,icon,wholeAddition,centerAddition,corePosition,coreAddition,studyCondition,upgradeMaterial FROM seaking_formation";
    var array = [];
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

FormationDao.prototype.insert = function(data, next) {
    var sql = "insert into seaking_formation set ?";
    var obj = data;
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        if(typeof next == "function")
            next(result);
    });
}

FormationDao.prototype.truncate = function(next) {
    var sql = "truncate table seaking_formation";
    var obj = {};
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        next(result);
    });
}

FormationDao.prototype.update = function(formation, next) {
    var sql = "";
    var array = [];
    var obj = mysqlUtil.updateSQL("seaking_formation", formation);
    sql = obj.sql;
    array = obj.array;
    console.log(sql);
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

module.exports = new FormationDao();