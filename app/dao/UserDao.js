/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-06-24
 * Description: UserDao
 */
var mysql = require('./mysql/mysql');

var UserDao = function() {

}

UserDao.prototype.login = function(loginName, password, next) {
    mysql.getConnection(function(err, connection) {
        // Use the connection
        connection.query("SELECT id,loginName,`password` FROM wozlla_user WHERE loginName=? AND PASSWORD=?", [loginName, password], function(err, rows) {
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

module.exports = new UserDao();