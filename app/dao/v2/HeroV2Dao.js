/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-11-13
 * Description: heroV2Dao
 */
var mysql = require('./../mysql/mysql');
var mysqlUtil = require('../../utils/mysqlUtil');

var HeroV2Dao = function() {

}

HeroV2Dao.prototype.getAllHeros = function(next) {
    var sql = "SELECT id,heroId,heroName,avatar,trait,starLevel,`type`,form,hp,attack,speed,defense,sunderArmor,criticalHit,block,dodge,counter,addHp,addAttack,addDefense,addSunderArmor,animationGroup,attrPicture,formationPicture FROM game_herosv2";
    var array = [];
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(err, rows);
    });
}

HeroV2Dao.prototype.getData = function(next) {
    var sql = "SELECT id,heroId,heroName name,avatar,trait,starLevel,`type`,form,hp,attack,speed,defense,sunderArmor,criticalHit,block,dodge,counter,addHp,addAttack,addDefense,addSunderArmor,animationGroup,attrPicture,formationPicture FROM game_herosv2";
    var array = [];
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

HeroV2Dao.prototype.insert = function(data, next) {
    var sql = "insert into game_herosv2 set ?";
    var obj = data;
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        if(typeof next == "function")
            next(result);
    });
}

HeroV2Dao.prototype.truncate = function(next) {
    var sql = "truncate table game_herosv2";
    var obj = {};
    mysqlUtil.executeSQL(sql, obj, function(err, result) {
        next(result);
    });
}

HeroV2Dao.prototype.update = function(equipment, next) {
    var sql = "";
    var array = [];
    var obj = mysqlUtil.updateSQL("game_herosv2", equipment);
    sql = obj.sql;
    array = obj.array;
    console.log(sql);
    mysqlUtil.executeSQL(sql, array, function(err, rows) {
        next(rows);
    });
}

module.exports = new HeroV2Dao();