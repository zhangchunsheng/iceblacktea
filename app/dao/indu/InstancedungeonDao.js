/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-07-11
 * Description: InstancedungeonDao
 */
var mysql = require('./../mysql/mysql');
var mysqlUtil = require('../../utils/mysqlUtil');

var InstancedungeonDao = function() {

}

InstancedungeonDao.prototype.getAllInstancedungeons = function(next) {
    var sql = "SELECT id,induId,`name`,cityId,`type`,maxIndex,induData,enterCondition,enterConditionValue,resourcePath,getExp,getMoney,getItems,`date`,bz,updateBz FROM seaking_instancedungeon";
    var array = [];
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

InstancedungeonDao.prototype.insert = function(data, next) {
    sql = "insert into seaking_instancedungeon set ?";
    obj = data;
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        if(typeof next == "function")
            next(result);
    });
}

InstancedungeonDao.prototype.truncate = function(next) {
    var sql = "truncate table seaking_instancedungeon";
    var obj = {};
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        next(result);
    });
}

InstancedungeonDao.prototype.update = function(monstergroup, next) {
    var sql = "";
    var array = [];
    var obj = mysqlUtil.updateSQL("seaking_instancedungeon", monstergroup);
    sql = obj.sql;
    array = obj.array;
    console.log(sql);
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

module.exports = new InstancedungeonDao();