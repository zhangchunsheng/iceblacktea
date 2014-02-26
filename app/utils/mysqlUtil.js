/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-06-24
 * Description: mysql
 */
var mysql = require('../dao/mysql/mysql');

var mysqlUtil = {

};

mysqlUtil.makeSQL = function(obj, key) {
    var sql = "";
    var array = [];
    for(var i in obj) {
        if(i == "id")
            continue;
        if(key) {
            if(i == key)
                continue;
        }
        sql += i + " = ?,";
        array.push(obj[i]);
    }
    sql = sql.substr(0, sql.length - 1);
    return {
        sql: sql,
        array: array
    };
}

mysqlUtil.updateSQL = function(tableName, obj, key) {
    var sql = "";
    var array = [];
    var data = mysqlUtil.makeSQL(obj, key);
    sql = data.sql;
    array = data.array;

    if(key) {
        if(typeof obj[key] == "string") {
            sql = "UPDATE " + tableName + " SET " + sql + " WHERE " + key + " = '" + obj[key] + "'";
        } else {
            sql = "UPDATE " + tableName + " SET " + sql + " WHERE " + key + " = " + obj[key] + "";
        }
    } else {
        sql = "UPDATE " + tableName + " SET " + sql + " WHERE id = " + obj.id;
    }
    console.log(sql);

    return {
        sql: sql,
        array: array
    };
}

mysqlUtil.executeSQL = function(sql, array, next) {
    mysql.getConnection(function(err, connection) {
        // Use the connection
        connection.query(sql, array, function(err, rows) {
            if(err)
                throw err;
            next(err, rows);
            // And done with the connection.
            connection.end();
            // Don't use the connection here, it has been returned to the pool.
        });
    });
}

module.exports = mysqlUtil;