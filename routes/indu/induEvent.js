/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-07-22
 * Description: induEvent
 */
var induEventService = require('../../app/services/indu/InduEventService');

exports.index = function(req, res) {
    var objects = [];
    induEventService.getData(function(data) {
        objects = data;
        console.log(objects);
        res.render('object', {
            title: 'instancedungeon event',
            name: 'instancedungeon event',
            dataName: '事件数据',
            saveRoute: 'indu_events',
            exportRoute: 'indu_events',
            objects: JSON.stringify(objects)
        });
    });
}

exports.update = function(req, res) {
    var id = req.params.id;
    var object = req.body.object;
    object = JSON.parse(object);
    induEventService.update(object, function(data) {
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}

exports.import = function(req, res) {
    console.log("import");
    var objects = [];
    induEventService.import(function(data) {
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
    induEventService.export(function(data) {
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
    induEventService.exportJson(function(data) {
        objects = data;
        console.log(objects);
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}