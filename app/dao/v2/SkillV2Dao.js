/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-11-21
 * Description: skillV2Dao
 */
var mysql = require('./../mysql/mysql');
var mysqlUtil = require('../../utils/mysqlUtil');

var HeroV2Dao = function() {

}

HeroV2Dao.prototype.getAllSkills = function(next) {
    var sql = "SELECT id,skillId,skillName,icon,skillDescription,`type`,onsetType,triggerCondition,initialLevel,initialEffectDesc,ultimateEffectDesc,getMethodDesc,upgradeSkillRequired,forgetSkillRequired FROM game_skillsv2";
    var array = [];
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(err, rows);
    });
}

HeroV2Dao.prototype.getData = function(next) {
    var sql = "SELECT id,skillId,skillName `name`,icon,skillDescription,`type`,onsetType,triggerCondition,initialLevel,initialEffectDesc,ultimateEffectDesc,getMethodDesc,upgradeSkillRequired,forgetSkillRequired FROM game_skillsv2";
    var array = [];
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

HeroV2Dao.prototype.insert = function(data, next) {
    var sql = "insert into game_skillsv2 set ?";
    var obj = data;
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        if(typeof next == "function")
            next(result);
    });
}

HeroV2Dao.prototype.truncate = function(next) {
    var sql = "truncate table game_skillsv2";
    var obj = {};
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        next(result);
    });
}

HeroV2Dao.prototype.update = function(equipment, next) {
    var sql = "";
    var array = [];
    var obj = mysqlUtil.updateSQL("game_skillsv2", equipment);
    sql = obj.sql;
    array = obj.array;
    console.log(sql);
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

module.exports = new HeroV2Dao();