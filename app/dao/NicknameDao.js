/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-06-24
 * Description: NicknameDao
 */
var mysql = require('./mysql/mysql');
var mysqlUtil = require('../utils/mysqlUtil');
var redis = require('../dao/redis/redis');
var redisConfig = require('../config/redis');

var env = process.env.NODE_ENV || 'development';
if(redisConfig[env]) {
    redisConfig = redisConfig[env];
}

var NicknameDao = function() {

}

NicknameDao.prototype.getAllNicknames = function(next) {
    var sql = "SELECT id,`name`,`date`,bz FROM character_nicknames LIMIT 0,100";
    var array = [];
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

/**
 *
 * @param data
 * @param next
 */
NicknameDao.prototype.writeToRedis = function(serverId, data, next) {
    redis.command(function(client) {
        var key = "S" + serverId + "_canUseNickname";
        client.multi().select(redisConfig.database.SEAKING_REDIS_DB, function(err, reply) {
            var array = [];
            for(var i = 0 ; i < data.length ; i++) {
                array.push(["sadd", key, data[i]["name"]]);
            }
            client.multi(array)
                .exec(function(err, reply) {
                    redis.release(client);
                    next(err, reply);
                });
        }).exec(function(err, reply) {

            });
    });
}

module.exports = new NicknameDao();