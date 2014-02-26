/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-07-17
 * Description: weaponDao
 */
var mysql = require('./../mysql/mysql');
var mysqlUtil = require('../../utils/mysqlUtil');

var EquipmentLevelupDao = function() {

}

EquipmentLevelupDao.prototype.getData = function(next) {
    //var sql = "SELECT a.id,a.equipmentId,b.equipmentName `name`,strengthenLevel,attack,attackPercentage,speedLevel,speedLevelPercentage,hp,hpPercentage,defense,defensePercentage,focus,criticalHit,critDamage,dodge,block,counter,counterDamage,stunt,confusion,upgradeMoney,upgradeMaterial,a.`date`,a.bz,a.updateBz FROM seaking_equipment_levelup a,seaking_equipment b WHERE a.equipmentId=b.equipmentId";
    var sql = "SELECT id,eqId equipmentId,equipmentName `name`,description,resourcePath,quality,`level`,useLevel,isBinding,price,destroyTime,strengthenLevel,attack,attackPercentage,speedLevel,speedLevelPercentage,hp,hpPercentage,defense,defensePercentage,focus,criticalHit,critDamage,dodge,block,counter,counterDamage,stunt,confusion,upgradeMoney,upgradeMaterial,nextEqId,`date`,bz,updateBz FROM seaking_equipment_levelup";
    var array = [];
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

EquipmentLevelupDao.prototype.insert = function(data, next) {
    var sql = "insert into seaking_equipment_levelup set ?";
    var obj = data;
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        if(typeof next == "function")
            next(result);
    });
}

EquipmentLevelupDao.prototype.truncate = function(next) {
    var sql = "truncate table seaking_equipment_levelup";
    var obj = {};
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        next(result);
    });
}

EquipmentLevelupDao.prototype.update = function(equipment_levelup, next) {
    var sql = "";
    var array = [];
    var obj = mysqlUtil.updateSQL("seaking_equipment_levelup", equipment_levelup);
    sql = obj.sql;
    array = obj.array;
    console.log(sql);
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

module.exports = new EquipmentLevelupDao();