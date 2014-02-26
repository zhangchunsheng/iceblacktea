/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-10-12
 * Description: scene
 */
var sceneService = require('../../app/services/SceneService');

exports.index = function(req, res) {
    res.render('index/scene', {
        title: '场景管理'
    });
}

exports.writeRedis = function(req, res) {
    var serverId = req.body.serverId;
    var cityId = req.body.cityId;
    sceneService.writeToRedis(serverId, cityId, function(err, reply) {
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}