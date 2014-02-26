/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-06-24
 * Description: ServerListDao
 */
var mysql = require('./mysql/mysql');
var mysqlUtil = require('../utils/mysqlUtil');

var ServerListDao = function() {

}

ServerListDao.prototype.getServerList = function(next) {
    mysql.getConnection(function(err, connection) {
        // Use the connection
        connection.query("SELECT id,`name`,ip,`port`,connectNumber,connectors,`date`,showName,bz,updateBz FROM sk_serverList", function(err, rows) {
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

ServerListDao.prototype.update = function(server, next) {
    mysql.getConnection(function(err, connection) {
        var sql = "";
        var array = [];
        var obj = mysqlUtil.makeSQL(server);
        sql = obj.sql;
        array = obj.array;
        sql = "UPDATE sk_serverList SET " + sql + " WHERE id = " + server.id;
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

module.exports = new ServerListDao();