/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-07-15
 * Description: PartnerDao
 */
var mysql = require('./mysql/mysql');
var mysqlUtil = require('../utils/mysqlUtil');

var PartnerDao = function() {

}

PartnerDao.prototype.getAllPartners = function(next) {
    var sql = "SELECT a.id,a.heroId,b.name heroName,a.`level`,a.`date`,a.bz,a.updateBz FROM game_partners a RIGHT JOIN game_heros b ON a.heroId=b.id";
    var array = [];
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

PartnerDao.prototype.getAllHeros  = function(next) {
    var sql = "SELECT a.id,a.heroId,b.name heroName,a.`level`,b.hp,b.hpFillRate,b.attack,b.attLevelUpRate,b.defense,b.defLevelUpRate,b.focus,b.focusMaxIncrement,b.speedLevel,b.speedMaxIncrement,b.dodge,b.dodgeMaxIncrement,b.criticalHit,b.critHitMaxIncrement,b.critDamage,b.critDamageMaxIncrement,b.block,b.blockMaxIncrement,b.counter,b.counterMaxIncrement,a.`date`,a.bz,a.updateBz FROM game_partners a RIGHT JOIN game_heros b ON a.heroId=b.id";
    var array = [];
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

PartnerDao.prototype.update = function(partner, next) {
    var sql = "";
    var array = [];
    var obj = mysqlUtil.updateSQL("game_partners", partner);
    sql = obj.sql;
    array = obj.array;
    console.log(sql);
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

module.exports = new PartnerDao();