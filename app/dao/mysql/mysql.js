/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-06-24
 * Description: mysql
 */
var config = require('../../config/config');
var mysql = require('mysql');
var pool  = mysql.createPool({
    host     : config.mysql.host,
    user     : config.mysql.user,
    password : config.mysql.password,
    database: config.mysql.database
});

module.exports = pool;