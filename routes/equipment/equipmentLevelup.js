/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-07-17
 * Description: equipmentLevel
 */
var equipmentLevelupService = require('../../app/services/equipment/EquipmentLevelupService');

exports.index = function(req, res) {
    var objects = [];
    equipmentLevelupService.getData(function(data) {
        objects = data;
        console.log(objects);
        res.render('object', {
            title: 'equipment levelup',
            name: 'equipments levelup',
            dataName: '武器升级数据',
            saveRoute: 'equipmentLevelup',
            exportRoute: 'equipmentsLevelup',
            objects: JSON.stringify(objects)
        });
    });
}

exports.update = function(req, res) {
    var id = req.params.id;
    var object = req.body.object;
    object = JSON.parse(object);
    equipmentLevelupService.update(object, function(data) {
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}

exports.import = function(req, res) {
    var objects = [];
    equipmentLevelupService.import(function(data) {
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
    equipmentLevelupService.export(function(data) {
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
    equipmentLevelupService.exportJson(function(data) {
        objects = data;
        console.log(objects);
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}