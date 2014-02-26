/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-07-05
 * Description: SyncDataService
 */
var syncDataDao = require('../dao/SyncDataDao');

var SyncDataService = function() {

}

SyncDataService.prototype.initServerList = function(next) {
    syncDataDao.initServerList(next);
}

/**
 * 写入数据到redis
 * @param next
 */
SyncDataService.prototype.initTaskList = function(next) {
    syncDataDao.initTaskList(next);
}

module.exports = new SyncDataService();