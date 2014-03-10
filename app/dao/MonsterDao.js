/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-06-24
 * Description: MonsterDao
 */
var mysql = require('./mysql/mysql');
var mysqlUtil = require('../utils/mysqlUtil');

var MonsterDao = function() {

}

MonsterDao.prototype.getAllMonsters = function(next) {
    var sql = "SELECT id,monsterId,monsterName,`level`,resourcePath,monsterType,attackType,hp,attack,defense,speed,focus,dodge,counter,block,criticalHit,critDamage,skillId,experience,money,items FROM seaking_monster";
    var array = [];
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

MonsterDao.prototype.insert = function(data, next) {
    var sql = "insert into seaking_monster set ?";
    var obj = data;
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        if(typeof next == "function")
            next(result);
    });
}

MonsterDao.prototype.truncate = function(next) {
    var sql = "truncate table seaking_monster";
    var obj = {};
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        next(result);
    });
}

MonsterDao.prototype.update = function(monster, next) {
    var sql = "";
    var array = [];
    var obj = mysqlUtil.updateSQL("seaking_monster", monster);
    sql = obj.sql;
    array = obj.array;
    console.log(sql);
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

module.exports = new MonsterDao();