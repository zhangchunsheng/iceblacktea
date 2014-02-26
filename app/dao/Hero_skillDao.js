/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-06-24
 * Description: Hero_skillDao
 */
var mysql = require('./mysql/mysql');
var mysqlUtil = require('../utils/mysqlUtil');

var Hero_skillDao = function() {

}

Hero_skillDao.prototype.getSkills = function(heroId, next) {
    var sql = "SELECT a.cId,b.id,b.skillId,b.name,b.description,b.type,b.scope,b.skilltype FROM seaking_hero_skills a,seaking_skills b WHERE cId=" + heroId + " AND a.skillId=b.skillId";
    var array = [];
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

Hero_skillDao.prototype.getSkillLevels = function(skillId, next) {
    var sql = "SELECT id,skillId,`level`,description,speed,effects,requirement FROM seaking_skills_level WHERE skillId='" + skillId + "'";
    var array = [];
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

Hero_skillDao.prototype.addSkills = function(data, next) {
    var sql = "insert into seaking_skills set ?";
    var obj = data;
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        if(typeof next == "function")
            next(result);
    });
}

Hero_skillDao.prototype.addHero_skill = function(data, next) {
    var sql = "insert into seaking_hero_skills set ?";
    var obj = data;
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        if(typeof next == "function")
            next(result);
    });
}

Hero_skillDao.prototype.addSkill_levels = function(data, next) {
    var sql = "insert into seaking_skills_level set ?";
    var obj = data;
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        if(typeof next == "function")
            next(result);
    });
}

Hero_skillDao.prototype.addSkillLevel = function(data, next) {
    var sql = "insert into seaking_skills_level set ?";
    var obj = data;
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        if(typeof next == "function")
            next(result);
    });
}

Hero_skillDao.prototype.updateSkillLevel = function(data, next) {
    var sql = "";
    var array = [];
    var obj = mysqlUtil.updateSQL("seaking_skills_level", data);
    sql = obj.sql;
    array = obj.array;
    console.log(sql);
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

Hero_skillDao.prototype.updateSkills = function(id, data, next) {
    var sql = "";
    var array = [];
    var obj = mysqlUtil.updateSQL("seaking_skills", data);
    sql = obj.sql;
    array = obj.array;
    console.log(sql);
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

module.exports = new Hero_skillDao();