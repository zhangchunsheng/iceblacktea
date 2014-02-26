/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-08-29
 * Description: skill_attrDao
 */
var mysql = require('./../mysql/mysql');
var mysqlUtil = require('../../utils/mysqlUtil');

var Skill_attrDao = function() {

}

Skill_attrDao.prototype.getData = function(next) {
    var sql = "SELECT attrID id,`name`,showName FROM seaking_skills_attr";
    var array = [];
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

Skill_attrDao.prototype.update = function(skill_attr, next) {
    var sql = "";
    var array = [];
    var obj = mysqlUtil.updateSQL("seaking_skills_attr", skill_attr);
    sql = obj.sql;
    array = obj.array;
    console.log(sql);
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

module.exports = new Skill_attrDao();