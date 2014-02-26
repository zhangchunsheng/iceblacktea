/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-09-18
 * Description: skillListDao
 */
var mysql = require('./../mysql/mysql');
var mysqlUtil = require('../../utils/mysqlUtil');

var SkillListDao = function() {

}

/**
 *
 * @param next
 */
SkillListDao.prototype.getData = function(next) {
    var sql = "SELECT id,skillId,hero_skillId,skillName,`level`,icon,description,`type`,heroId,skillNo,scope,skillType,speed,buffs,effects,requirement,nextSkillId FROM game_skills_level";
    var array = [];
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

SkillListDao.prototype.getExportData = function(next) {
    var sql = "SELECT id,skillId,hero_skillId,skillName,`level`,icon,description,`type`,heroId,skillNo,scope,skillType,speed,buffs,effects,requirement,nextSkillId FROM game_skills_level";
    var array = [];
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

SkillListDao.prototype.getHeroSkillData = function(next) {
    var sql = "SELECT DISTINCT heroId,CONCAT(hero_skillId,'1') skillId,skillName,`type` FROM game_skills_level";
    var array = [];
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

SkillListDao.prototype.update = function(skill, next) {
    var sql = "";
    var array = [];
    var obj = mysqlUtil.updateSQL("game_skills_level", skill, "skillId");
    sql = obj.sql;
    array = obj.array;
    console.log(sql);
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        if(typeof next == "function")
            next(rows);
    });
}

SkillListDao.prototype.insert = function(data, next) {
    var sql = "insert into game_skills_level set ?";
    var obj = data;
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        if(typeof next == "function")
            next(result);
    });
}

SkillListDao.prototype.truncate = function(next) {
    var sql = "truncate table game_skills_level";
    var obj = {};
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        next(result);
    });
}

module.exports = new SkillListDao();