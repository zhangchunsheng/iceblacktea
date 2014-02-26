/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-07-04
 * Description: initData
 */
var mysql = require('../dao/mysql/mysql');
var mysqlUtil = require('../utils/mysqlUtil');
var redis = require('../dao/redis/redis');
var redisConfig = require('../config/redis');
var taskDao = require('./TaskDao');

var env = process.env.NODE_ENV || 'development';
if(redisConfig[env]) {
    redisConfig = redisConfig[env];
}

var SyncDataDao = function() {

}

SyncDataDao.prototype.initUser = function(next) {
    var sql = "SELECT id,loginName,`password`,nickname,registerType,email,phoneNum,country,province,city,birthdate,registerDate,`date`,bz,updatebz,userId FROM uc_user";
    var array = [];
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

/**
 * 初始化服务器列表
 * @param next
 */
SyncDataDao.prototype.initServerList = function(next) {
    var sql = "SELECT id,`name`,ip,`port`,connectNumber,connectors,`date`,showName,bz,updateBz FROM sk_serverList WHERE bz=1";
    var array = [];
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        redis.command(function(client) {
            client.multi().select(redisConfig.database.UC_USER_REDIS_DB, function() {

            }).del("sk_serverList", function() {
                    console.log("sk_serverList");
                    for(var i = 0 ; i < rows.length ; i++) {
                        key = "SL_SK_" + rows[i].id;
                        client.rpush("sk_serverList", key);
                        for(var o in rows[i]) {
                            if(o && o != "parse" && o.substr(0, 1) != "_") {
                                client.hset(key, o, rows[i][o]);
                            }
                        }
                    }
                    redis.release(client);
                    next(rows);
                })
            .exec(function (err, replies) {
                console.log(replies);
            });
        });
    });
}

/**
 * 任务列表
 * @param next
 */
SyncDataDao.prototype.initTaskList = function(next) {
    taskDao.getTaskList(function(rows) {
        redis.command(function(client) {
            client.multi().select(redisConfig.database.SEAKING_REDIS_DB, function() {
                console.log("sk_taskList");
                var key = "";
                for(var i = 0 ; i < rows.length ; i++) {
                    key = "TASK_" + rows[i].taskId;
                    client.del(key, function() {

                    });
                    for(var o in rows[i]) {
                        if(o && o != "parse" && o.substr(0, 1) != "_") {
                            client.hset(key, o, rows[i][o]);
                        }
                    }
                }
                redis.release(client);
                next(rows);
            }).exec(function (err, replies) {
                console.log(replies);
            });
        });
    });
}

module.exports = new SyncDataDao();