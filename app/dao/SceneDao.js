/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-10-12
 * Description: SceneDao
 */
var mysql = require('./mysql/mysql');
var mysqlUtil = require('../utils/mysqlUtil');
var redis = require('../dao/redis/redis');
var redisConfig = require('../config/redis');

var env = process.env.NODE_ENV || 'development';
if(redisConfig[env]) {
    redisConfig = redisConfig[env];
}

var SceneDao = function() {

}

/**
 *
 * @param data
 * @param next
 */
SceneDao.prototype.writeToRedis = function(serverId, cityId, next) {
    redis.command(function(client) {
        var key = cityId;
        client.multi().select(redisConfig.database.SEAKING_REDIS_DB, function(err, reply) {
            var array = [];
            var field;
            var name;
            var value = {};
            var date = new Date();
            for(var i = 0 ; i < 1000 ; i++) {
                field = "S" + serverId + "C" + i;
                name = "test" + i;
                value = {
                    cId: 1,
                    name: name,
                    time: date.getTime()
                }
                array.push(["hset", key, field, JSON.stringify(value)]);
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

module.exports = new SceneDao();