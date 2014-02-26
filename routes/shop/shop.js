/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2014-01-13
 * Description: shop
 */
var shopService = require('../../app/services/shop/ShopService');

exports.index = function(req, res) {
    var objects = [];
    shopService.getData(function(data) {
        objects = data;
        console.log(objects);
        res.render('object', {
            title: 'shop',
            name: 'shops',
            dataName: '商店数据',
            saveRoute: 'shop',
            exportRoute: 'shops',
            objects: JSON.stringify(objects)
        });
    });
}

exports.update = function(req, res) {
    var id = req.params.id;
    var object = req.body.object;
    object = JSON.parse(object);
    shopService.update(object, function(data) {
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}

exports.import = function(req, res) {
    var objects = [];
    shopService.import(function(data) {
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
    shopService.export(function(data) {
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
    shopService.exportJson(function(data) {
        objects = data;
        console.log(objects);
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}