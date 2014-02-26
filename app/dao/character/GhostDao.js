/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-12-09
 * Description: ghostDao
 */
var mysql = require('./../mysql/mysql');
var mysqlUtil = require('../../utils/mysqlUtil');

var GhostDao = function() {

}

GhostDao.prototype.getData = function(next) {
    var sql = "SELECT id,hId cId,heroId,page,color,pointId,attrId,attrValue,costGhostNum,probability,pointX,pointY FROM seaking_ghost limit 100";
    var array = [];
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

GhostDao.prototype.getAllData = function(next) {
    var sql = "SELECT id,hId cId,heroId,page,color,pointId,attrId,attrValue,costGhostNum,probability,pointX,pointY FROM seaking_ghost";
    var array = [];
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

GhostDao.prototype.insert = function(data, next) {
    var sql = "insert into seaking_ghost set ?";
    var obj = data;
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        if(typeof next == "function")
            next(result);
    });
}

GhostDao.prototype.truncate = function(next) {
    var sql = "truncate table seaking_ghost";
    var obj = {};
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        next(result);
    });
}

GhostDao.prototype.update = function(equipment, next) {
    var sql = "";
    var array = [];
    var obj = mysqlUtil.updateSQL("seaking_ghost", equipment);
    sql = obj.sql;
    array = obj.array;
    console.log(sql);
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

module.exports = new GhostDao();