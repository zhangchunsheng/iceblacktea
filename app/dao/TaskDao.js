/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-07-08
 * Description: TaskDao
 */
var mysql = require('./mysql/mysql');
var mysqlUtil = require('../utils/mysqlUtil');

var TaskDao = function() {

}

TaskDao.prototype.getTaskList = function(next) {
    mysql.getConnection(function(err, connection) {
        // Use the connection
        connection.query("SELECT id,taskId,`type`,taskName,taskBeginTime,taskEndTime,taskExpireTime,minLevel,maxLevel,needSociaty,sociatyValue,questNpcId,completeNpcId,taskProp,taskGoal,taskDescription,taskTalkNum,taskTalk,notCompleteText,completeText,getExp,getMoney,rewardName,rewardItems,isBroadcast,nextTaskId,`date`,bz,showNpcId,hideNpcId FROM seaking_task", function(err, rows) {
            if(err)
                throw err;
            console.log(rows);
            next(rows);
            // And done with the connection.
            connection.end();
            // Don't use the connection here, it has been returned to the pool.
        });
    });
}

TaskDao.prototype.insert = function(data, next) {
    var sql = "insert into seaking_task set ?";
    var obj = data;
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        if(typeof next == "function")
            next(result);
    });
}

TaskDao.prototype.truncate = function(next) {
    var sql = "truncate table seaking_task";
    var obj = {};
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        next(result);
    });
}

TaskDao.prototype.update = function(task, next) {
    mysql.getConnection(function(err, connection) {
        var sql = "";
        var array = [];
        var obj = mysqlUtil.updateSQL("seaking_task", task);
        sql = obj.sql;
        array = obj.array;
        console.log(sql);
        mysqlUtil.executeSQL(sql, array, function(err, rows) {
            next(rows);
        });
    });
}

module.exports = new TaskDao();