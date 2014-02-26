/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-11-13
 * Description: herov2
 */
var heroV2Service = require('../../app/services/v2/HeroV2Service');

exports.index = function(req, res) {
    var objects = [];
    heroV2Service.getData(function(data) {
        objects = data;
        console.log(objects);
        res.render('object', {
            title: 'heroV2',
            name: 'heroV2s',
            dataName: '英雄数据',
            saveRoute: 'heroV2',
            exportRoute: 'heroV2s',
            objects: JSON.stringify(objects)
        });
    });
}

exports.update = function(req, res) {
    var id = req.params.id;
    var object = req.body.object;
    object = JSON.parse(object);
    heroV2Service.update(object, function(data) {
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}

exports.import = function(req, res) {
    var objects = [];
    heroV2Service.import(function(data) {
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
    heroV2Service.export(function(data) {
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
    heroV2Service.exportJson(function(data) {
        objects = data;
        console.log(objects);
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}