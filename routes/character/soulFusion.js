/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2014-02-13
 * Description: soulFusion
 */
var soulFusionService = require('../../app/services/character/SoulFusionService');

exports.index = function(req, res) {
    var objects = [];
    soulFusionService.getData(function(data) {
        objects = data;
        console.log(objects);
        res.render('object', {
            title: 'soulFusion',
            name: 'soulFusions',
            dataName: '灵魂融合数据',
            saveRoute: 'soulFusion',
            exportRoute: 'soulFusions',
            objects: JSON.stringify(objects)
        });
    });
}

exports.update = function(req, res) {
    var id = req.params.id;
    var object = req.body.object;
    object = JSON.parse(object);
    soulFusionService.update(object, function(data) {
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}

exports.import = function(req, res) {
    var objects = [];
    soulFusionService.import(function(data) {
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
    soulFusionService.export(function(data) {
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
    soulFusionService.exportJson(function(data) {
        objects = data;
        console.log(objects);
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}