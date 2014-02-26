/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-07-15
 * Description: CharacterDao
 */
var mysql = require('../dao/mysql/mysql');
var mysqlUtil = require('../utils/mysqlUtil');
var utils = require('../utils/utils');
var redis = require('../dao/redis/redis');
var redisConfig = require('../config/redis');
var taskDao = require('./TaskDao');
var partnerDao = require('./PartnerDao');
var formula = require('../../shared/formula');

var env = process.env.NODE_ENV || 'development';
if(redisConfig[env]) {
    redisConfig = redisConfig[env];
}

var CharacterDao = function() {

}
CharacterDao.prototype.readRedis = function(serverId, registerType, loginName, next) {
    redis.command(function(client) {
        var key = "S" + serverId + "_T" + registerType + "_" + loginName;
        client.multi().select(redisConfig.database.SEAKING_REDIS_DB, function() {

        }).hget(key, "characters", function(err, reply) {
                key = "S" + serverId + "_T" + registerType + "_" + loginName + "_C" + reply;

                client.hgetall(key, function(err, reply) {
                    redis.release(client);
                    next(reply);
                });
            })
            .exec(function (err, replies) {
                console.log(replies);
            });
    });
}

CharacterDao.prototype.writeRedis = function(serverId, registerType, loginName, field, value, next) {
    partnerDao.getAllHeros(function(data) {
        redis.command(function(client) {
            var key = "S" + serverId + "_T" + registerType + "_" + loginName;
            client.multi().select(redisConfig.database.SEAKING_REDIS_DB, function() {

            }).hget(key, "characters", function(err, reply) {
                    key = "S" + serverId + "_T" + registerType + "_" + loginName + "_C" + reply;
                    if(field == "_partners") {
                        var array = value.split(",");
                        var cId = 0;
                        var level = 0;
                        var partners = [];
                        var partner = {};
                        var hero = {};
                        console.log(array);
                        for(var i = 0 ; i < array.length ; i++) {
                            cId = array[i];
                            hero = utils.getItem(data, cId);
                            level = hero.level;
                            partner = {
                                cId: cId,
                                level: level,
                                experience: formula.calculateAccumulated_xp(hero.xpNeeded, hero.levelFillRate, level),
                                hp: formula.calculateHp(parseInt(hero.hp), parseInt(hero.hpFillRate), level),
                                attack: formula.calculateAttack(parseInt(hero.attack), parseInt(hero.attLevelUpRate), level),
                                defense: formula.calculateDefense(parseInt(hero.defense), parseInt(hero.defLevelUpRate), level),
                                focus: formula.calculateFocus(parseInt(hero.focus), parseInt(hero.focusMaxIncrement), level),
                                speedLevel: formula.calculateSpeedLevel(parseInt(hero.speedLevel), parseInt(hero.speedMaxIncrement), level),
                                speed: formula.calculateSpeed(parseInt(hero.speedLevel), parseInt(hero.speedMaxIncrement), level),
                                dodge: formula.calculateDodge(parseInt(hero.dodge), parseInt(hero.dodgeMaxIncrement), level),
                                criticalHit: formula.calculateCriticalHit(parseInt(hero.criticalHit), parseInt(hero.critHitMaxIncrement), level),
                                critDamage: formula.calculateCritDamage(parseInt(hero.critDamage), parseInt(hero.critDamageMaxIncrement), level),
                                block: formula.calculateBlock(parseInt(hero.block), parseInt(hero.blockMaxIncrement), level),
                                counter: formula.calculateCounter(parseInt(hero.counter), parseInt(hero.counterMaxIncrement), level)
                            };
                            partners.push(partner);
                        }
                        client.hset(key, field, JSON.stringify({partners: partners}));
                    } else {
                        client.hset(key, field, value);
                    }

                    redis.release(client);
                    next(reply);
                })
            .exec(function (err, replies) {
                console.log(replies);
            });
        });
    });
}

module.exports = new CharacterDao();