/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-10-12
 * Description: SceneService
 */
var sceneDao = require('../dao/SceneDao')
    , utils = require('../utils/utils');

var SceneService = function() {

}

SceneService.prototype.writeToRedis = function(serverId, cityId, next) {
    sceneDao.writeToRedis(serverId, cityId, next);
}

module.exports = new SceneService();