/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-07-17
 * Description: weaponDao
 */
var mysql = require('./../mysql/mysql');
var mysqlUtil = require('../../utils/mysqlUtil');

var EquipmentDao = function() {

}

EquipmentDao.prototype.getData = function(next) {
    var sql = "SELECT id,equipmentId,equipmentName name,resourcePath,quality,`level`,useLevel,isBinding,price,lifeTime,destroyTime,`date`,bz,updateBz FROM seaking_equipment";
    var array = [];
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

EquipmentDao.prototype.insert = function(data, next) {
    var sql = "insert into seaking_equipment set ?";
    var obj = data;
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        if(typeof next == "function")
            next(result);
    });
}

EquipmentDao.prototype.truncate = function(next) {
    var sql = "truncate table seaking_equipment";
    var obj = {};
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        next(result);
    });
}

EquipmentDao.prototype.update = function(equipment, next) {
    var sql = "";
    var array = [];
    var obj = mysqlUtil.updateSQL("seaking_equipment", equipment);
    sql = obj.sql;
    array = obj.array;
    console.log(sql);
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

module.exports = new EquipmentDao();