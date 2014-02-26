/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-07-18
 * Description: npc
 */
var npcService = require('../app/services/NpcService');

exports.index = function(req, res) {
    var objects = [];
    npcService.getData(function(data) {
        objects = data;
        console.log(objects);
        res.render('object', {
            title: 'npc',
            name: 'npcs',
            dataName: 'NPC数据',
            saveRoute: 'npc',
            exportRoute: 'npcs',
            objects: JSON.stringify(objects)
        });
    });
}

exports.update = function(req, res) {
    var id = req.params.id;
    var object = req.body.object;
    object = JSON.parse(object);
    npcService.update(object, function(data) {
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}

exports.import = function(req, res) {
    var objects = [];
    npcService.import(function(data) {
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
    npcService.export(function(data) {
        objects = data;
        console.log(objects);
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}