/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-07-17
 * Description: cityDao
 */
var mysql = require('./mysql/mysql');
var mysqlUtil = require('../utils/mysqlUtil');

var CityDao = function() {

}

CityDao.prototype.getData = function(next) {
    var sql = "SELECT id,cityId,cityName `name`,description,npcs,`level`,width,height,path,towerWidth,towerHeight,`date`,bz,updateBz FROM seaking_city";
    var array = [];
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

CityDao.prototype.insert = function(data, next) {
    var sql = "insert into seaking_city set ?";
    var obj = data;
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        if(typeof next == "function")
            next(result);
    });
}

CityDao.prototype.truncate = function(next) {
    var sql = "truncate table seaking_city";
    var obj = {};
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        next(result);
    });
}

CityDao.prototype.update = function(city, next) {
    var sql = "";
    var array = [];
    var obj = mysqlUtil.updateSQL("seaking_city", city);
    sql = obj.sql;
    array = obj.array;
    console.log(sql);
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

module.exports = new CityDao();