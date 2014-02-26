/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-08-29
 * Description: skillDao
 */
var mysql = require('./../mysql/mysql');
var mysqlUtil = require('../../utils/mysqlUtil');

var SkillDao = function() {

}

SkillDao.prototype.getData = function(next) {
    var sql = "SELECT id,skillId,`name`,description,`type`,scope,skilltype FROM seaking_skills";
    var array = [];
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

SkillDao.prototype.update = function(skill, next) {
    var sql = "";
    var array = [];
    var obj = mysqlUtil.updateSQL("seaking_skills", skill);
    sql = obj.sql;
    array = obj.array;
    console.log(sql);
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

module.exports = new SkillDao();