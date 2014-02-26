/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2014-02-17
 * Description: altar_exchange
 */
var altarExchangeService = require('../../app/services/character/AltarExchangeService');

exports.index = function(req, res) {
    var objects = [];
    altarExchangeService.getData(function(data) {
        objects = data;
        console.log(objects);
        res.render('object', {
            title: 'altar_exchange',
            name: 'altar_exchanges',
            dataName: '交换数据',
            saveRoute: 'altar_exchange',
            exportRoute: 'altar_exchanges',
            objects: JSON.stringify(objects)
        });
    });
}

exports.update = function(req, res) {
    var id = req.params.id;
    var object = req.body.object;
    object = JSON.parse(object);
    altarExchangeService.update(object, function(data) {
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}

exports.import = function(req, res) {
    var objects = [];
    altarExchangeService.import(function(data) {
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
    altarExchangeService.export(function(data) {
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
    altarExchangeService.exportJson(function(data) {
        objects = data;
        console.log(objects);
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}