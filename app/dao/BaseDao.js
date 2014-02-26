/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-08-03
 * Description: baseDao
 */
var EventEmitter = require('events').EventEmitter;
var mysql = require('./mysql/mysql');
var mysqlUtil = require('../utils/mysqlUtil');
var util = require('util');

var BaseDao = function(opts) {
    EventEmitter.call(this);
    this.columns = opts.columns;
    this.tableName = opts.tableName;
}

util.inherits(BaseDao, EventEmitter);

BaseDao.prototype.getData = function(next) {
    var sql = "SELECT " + this.columns + " FROM " + this.tableName;
    var array = [];
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

BaseDao.prototype.insert = function(data, next) {
    var sql = "insert into " + this.tableName + " set ?";
    var obj = data;
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        if(typeof next == "function")
            next(result);
    });
}

BaseDao.prototype.truncate = function(next) {
    var sql = "truncate table " + this.tableName;
    var obj = {};
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        next(result);
    });
}

BaseDao.prototype.update = function(object, next) {
    var sql = "";
    var array = [];
    var obj = mysqlUtil.updateSQL(this.tableName, object);
    sql = obj.sql;
    array = obj.array;
    console.log(sql);
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

module.exports = BaseDao;