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
    var sql = "SELECT id,equipmentId,equipmentName `name`,description,resourcePath,quality,`level`,forgeLevel,isBinding,price,destroyTime,attrId,attrValue,attrAddValue,attrAddForgeValue,appendAttrId,appendAttrValue,appendAttrAddValue,appendAttrAddForgeValue,nextEqId FROM seaking_equipmentv2";
    var array = [];
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

EquipmentDao.prototype.insert = function(data, next) {
    var sql = "insert into seaking_equipmentv2 set ?";
    var obj = data;
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        if(typeof next == "function")
            next(result);
    });
}

EquipmentDao.prototype.truncate = function(next) {
    var sql = "truncate table seaking_equipmentv2";
    var obj = {};
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        next(result);
    });
}

EquipmentDao.prototype.update = function(equipment, next) {
    var sql = "";
    var array = [];
    var obj = mysqlUtil.updateSQL("seaking_equipmentv2", equipment);
    sql = obj.sql;
    array = obj.array;
    console.log(sql);
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

module.exports = new EquipmentDao();