/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-06-24
 * Description: NicknameService
 */
var nicknameDao = require('../dao/NicknameDao')
    , utils = require('../utils/utils');

var NicknameService = function() {

}

NicknameService.prototype.getAllNicknames = function(next) {
    nicknameDao.getAllNicknames(next);
}

NicknameService.prototype.import = function(next) {

}

NicknameService.prototype.export = function(next) {
    this.getAllNicknames(function(data) {
        utils.writeArray(data, ["name"], "nicknames", next);
    });
}

NicknameService.prototype.writeToRedis = function(serverId, next) {
    this.getAllNicknames(function(data) {
        nicknameDao.writeToRedis(serverId, data, next);
    });
}

module.exports = new NicknameService();