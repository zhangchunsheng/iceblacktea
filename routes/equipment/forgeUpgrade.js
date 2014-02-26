/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-12-18
 * Description: forgeUpgrade
 */
var forgeUpgradeService = require('../../app/services/equipment/ForgeUpgradeService');

exports.index = function(req, res) {
    var objects = [];
    forgeUpgradeService.getData(function(data) {
        objects = data;
        console.log(objects);
        res.render('object', {
            title: 'forgeUpgrade',
            name: 'forgeUpgrades',
            dataName: '打造数据',
            saveRoute: 'forgeUpgrade',
            exportRoute: 'forgeUpgrades',
            objects: JSON.stringify(objects)
        });
    });
}

exports.update = function(req, res) {
    var id = req.params.id;
    var object = req.body.object;
    object = JSON.parse(object);
    forgeUpgradeService.update(object, function(data) {
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}

exports.import = function(req, res) {
    var objects = [];
    forgeUpgradeService.import(function(data) {
        objects = data;
        console.log(objects);
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}

exports.export = function(req, res) {
    var objects = [];
    forgeUpgradeService.export(function(data) {
        objects = data;
        console.log(objects);
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}

exports.exportJson = function(req, res) {
    var objects = [];
    forgeUpgradeService.exportJson(function(data) {
        objects = data;
        console.log(objects);
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}