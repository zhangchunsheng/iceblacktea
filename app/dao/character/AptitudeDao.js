/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-12-09
 * Description: aptitudeDao
 */
var mysql = require('./../mysql/mysql');
var mysqlUtil = require('../../utils/mysqlUtil');

var AptitudeDao = function() {

}

AptitudeDao.prototype.getData = function(next) {
    var sql = "SELECT id,hId cId,heroId,hp,attack,defense,sunderArmor,speed,criticalHit,block,dodge,counter,aptitudes FROM seaking_aptitude";
    var array = [];
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

AptitudeDao.prototype.insert = function(data, next) {
    var sql = "insert into seaking_aptitude set ?";
    var obj = data;
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        if(typeof next == "function")
            next(result);
    });
}

AptitudeDao.prototype.truncate = function(next) {
    var sql = "truncate table seaking_aptitude";
    var obj = {};
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        next(result);
    });
}

AptitudeDao.prototype.update = function(equipment, next) {
    var sql = "";
    var array = [];
    var obj = mysqlUtil.updateSQL("seaking_aptitude", equipment);
    sql = obj.sql;
    array = obj.array;
    console.log(sql);
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

module.exports = new AptitudeDao();