/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-09-18
 * Description: skillEffectDao
 */
var mysql = require('./../mysql/mysql');
var mysqlUtil = require('../../utils/mysqlUtil');

var SkillEffectDao = function() {

}

SkillEffectDao.prototype.getData = function(next) {
    var sql = "SELECT id,skillId,effectId,`level`,serialNumber,attr,valueType,`value`,targetType,targetValue,timeType,timeValue FROM game_skills_effect";
    var array = [];
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

SkillEffectDao.prototype.update = function(skill, next) {
    var sql = "";
    var array = [];
    var obj = mysqlUtil.updateSQL("game_skills_effect", skill);
    sql = obj.sql;
    array = obj.array;
    console.log(sql);
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

SkillEffectDao.prototype.insert = function(data, next) {
    var sql = "insert into game_skills_effect set ?";
    var obj = data;
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        if(typeof next == "function")
            next(result);
    });
}

SkillEffectDao.prototype.truncate = function(next) {
    var sql = "truncate table game_skills_effect";
    var obj = {};
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        next(result);
    });
}

module.exports = new SkillEffectDao();