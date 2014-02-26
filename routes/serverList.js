/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-07-04
 * Description: serverList
 */
var serverListService = require('../app/services/ServerListService');
var syncDataService = require('../app/services/SyncDataService');

exports.index = function(req, res) {
    var serverList = [];
    serverListService.getServerList(function(data) {
        serverList = data;
        console.log(serverList);
        res.render('serverList', {
            title: 'server list',
            serverList: JSON.stringify(serverList)
        });
    });
};

/**
 * 更新
 * @param req
 * @param res
 */
exports.update = function(req, res) {
    var id = req.params.id;
    var server = req.body.server;
    server = JSON.parse(server);
    serverListService.update(server, function(data) {
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}

/**
 * export
 * @param req
 * @param res
 */
exports.export = function(req, res) {
    syncDataService.initServerList(function() {
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}

exports.exportJson = function(req, res) {
    syncDataService.initServerList(function() {
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}