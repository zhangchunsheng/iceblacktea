/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-12-18
 * Description: diamond
 */
var diamondService = require('../../app/services/equipment/DiamondService');

exports.index = function(req, res) {
    var objects = [];
    diamondService.getData(function(data) {
        objects = data;
        console.log(objects);
        res.render('object', {
            title: 'diamond',
            name: 'diamonds',
            dataName: '宝石数据',
            saveRoute: 'diamond',
            exportRoute: 'diamonds',
            objects: JSON.stringify(objects)
        });
    });
}

exports.update = function(req, res) {
    var id = req.params.id;
    var object = req.body.object;
    object = JSON.parse(object);
    diamondService.update(object, function(data) {
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}

exports.import = function(req, res) {
    var objects = [];
    diamondService.import(function(data) {
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
    diamondService.export(function(data) {
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
    diamondService.exportJson(function(data) {
        objects = data;
        console.log(objects);
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}