/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-07-17
 * Description: npcDao
 */
var mysql = require('./mysql/mysql');
var mysqlUtil = require('../utils/mysqlUtil');

var NpcDao = function() {

}

NpcDao.prototype.getData = function(next) {
    var sql = "SELECT id,npcId,npcName `name`,bustPosition,isShow,`position`,ans,bust FROM seaking_npc";
    var array = [];
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

NpcDao.prototype.insert = function(data, next) {
    var sql = "insert into seaking_npc set ?";
    var obj = data;
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        if(typeof next == "function")
            next(result);
    });
}

NpcDao.prototype.truncate = function(next) {
    var sql = "truncate table seaking_npc";
    var obj = {};
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        next(result);
    });
}

NpcDao.prototype.update = function(npc, next) {
    var sql = "";
    var array = [];
    var obj = mysqlUtil.updateSQL("seaking_npc", npc);
    sql = obj.sql;
    array = obj.array;
    console.log(sql);
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

module.exports = new NpcDao();