/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-06-24
 * Description: HeroDao
 */
var mysql = require('./mysql/mysql');

var HeroDao = function() {

}

HeroDao.prototype.getAllHeros = function(next) {
    mysql.getConnection(function(err, connection) {
        // Use the connection
        connection.query("SELECT id,`name`,`type`,baseLevel,photo,xpNeeded,levelFillRate,accumulated_xp,hp,hpFillRate,attack,attLevelUpRate,defense,defLevelUpRate," +
            "focus,focusMaxIncrement,speedLevel,speed,speedMaxIncrement,dodge,dodgeMaxIncrement,criticalHit,critHitMaxIncrement,critDamage," +
            "critDamageMaxIncrement,block,blockMaxIncrement,counter,counterMaxIncrement FROM game_heros", function(err, rows) {
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

HeroDao.prototype.update = function(hero, next) {
    mysql.getConnection(function(err, connection) {
        var sql = "";
        var array = [];
        for(var i in hero) {
            if(i == "id")
                continue;
            sql += i + " = ?,";
            array.push(hero[i]);
        }
        sql = sql.substr(0, sql.length - 1);
        sql = "UPDATE game_heros SET " + sql + " WHERE id = " + hero.id;
        console.log(sql);
        // Use the connection
        connection.query(sql, array, function(err, rows) {
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

module.exports = new HeroDao();