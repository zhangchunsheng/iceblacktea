/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-12-09
 * Description: tactical
 */
var tacticalService = require('../../app/services/formation/TacticalService');

exports.index = function(req, res) {
    var objects = [];
    tacticalService.getData(function(data) {
        objects = data;
        console.log(objects);
        res.render('object', {
            title: 'tactical',
            name: 'tacticals',
            dataName: '阵法数据',
            saveRoute: 'tactical',
            exportRoute: 'tacticals',
            objects: JSON.stringify(objects)
        });
    });
}

exports.update = function(req, res) {
    var id = req.params.id;
    var object = req.body.object;
    object = JSON.parse(object);
    tacticalService.update(object, function(data) {
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}

exports.import = function(req, res) {
    var objects = [];
    tacticalService.import(function(data) {
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
    tacticalService.export(function(data) {
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
    tacticalService.exportJson(function(data) {
        objects = data;
        console.log(objects);
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}