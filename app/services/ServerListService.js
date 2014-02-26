/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-06-24
 * Description: ServerListService
 */
var serverListDao = require('../dao/ServerListDao');

var ServerListService = function() {

}

ServerListService.prototype.getServerList = function(next) {
    serverListDao.getServerList(next);
}

ServerListService.prototype.update = function(server, next) {
    serverListDao.update(server, next);
}

module.exports = new ServerListService();