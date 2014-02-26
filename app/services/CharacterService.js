/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-07-15
 * Description: CharacterService
 */
var characterDao = require('../dao/CharacterDao');

var CharacterService = function() {

}

CharacterService.prototype.readRedis = function(serverId, registerType, loginName, next) {
    characterDao.readRedis(serverId, registerType, loginName, next);
}

CharacterService.prototype.writeRedis = function(serverId, registerType, loginName, field, value, next) {
    characterDao.writeRedis(serverId, registerType, loginName, field, value, next);
}

module.exports = new CharacterService();