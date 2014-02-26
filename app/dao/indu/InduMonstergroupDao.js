/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-07-11
 * Description: InduMonstergroupDao
 */
var mysql = require('./../mysql/mysql');
var mysqlUtil = require('../../utils/mysqlUtil');

var InduMonstergroupDao = function() {

}

InduMonstergroupDao.prototype.getAllMonstergroups = function(next) {
    var sql = "SELECT id,mgid,showName,formation,`date`,bz,updateBz FROM seaking_indu_monstergroup";
    var array = [];
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

/**
 * 获得所有怪物组阵型
 * @param next
 */
InduMonstergroupDao.prototype.getAllFormations = function(next) {
    var sql = "SELECT mgid,formation FROM seaking_indu_monstergroup";
    var array = [];
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        var obj = {};
        for(var i = 0 ; i < rows.length ; i++) {
            obj[rows[i].mgid] = JSON.parse(rows[i].formation);
        }
        next(obj);
    });
}

InduMonstergroupDao.prototype.insert = function(data, next) {
    sql = "insert into seaking_indu_monstergroup set ?";
    obj = data;
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        if(typeof next == "function")
            next(result);
    });
}

InduMonstergroupDao.prototype.truncate = function(next) {
    var sql = "truncate table seaking_indu_monstergroup";
    var obj = {};
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        next(result);
    });
}

InduMonstergroupDao.prototype.update = function(monstergroup, next) {
    var sql = "";
    var array = [];
    var obj = mysqlUtil.updateSQL("seaking_indu_monstergroup", monstergroup);
    sql = obj.sql;
    array = obj.array;
    console.log(sql);
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

module.exports = new InduMonstergroupDao();