/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-06-24
 * Description: UserService
 */
var userDao = require('../dao/UserDao');

var UserService = function() {

}

UserService.prototype.login = function(loginName, password, next) {
    userDao.login(loginName, password, next);
}

module.exports = new UserService();