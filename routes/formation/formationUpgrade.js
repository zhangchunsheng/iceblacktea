/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2014-01-13
 * Description: formationUpgrade
 */
var formationUpgradeService = require('../../app/services/formation/FormationUpgradeService');

exports.index = function(req, res) {
    var objects = [];
    formationUpgradeService.getData(function(data) {
        objects = data;
        console.log(objects);
        res.render('object', {
            title: 'formationUpgrade',
            name: 'formationUpgrades',
            dataName: '阵型升级数据',
            saveRoute: 'formationUpgrade',
            exportRoute: 'formationUpgrades',
            objects: JSON.stringify(objects)
        });
    });
}

exports.update = function(req, res) {
    var id = req.params.id;
    var object = req.body.object;
    object = JSON.parse(object);
    formationUpgradeService.update(object, function(data) {
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}

exports.import = function(req, res) {
    var objects = [];
    formationUpgradeService.import(function(data) {
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
    formationUpgradeService.export(function(data) {
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
    formationUpgradeService.exportJson(function(data) {
        objects = data;
        console.log(objects);
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}