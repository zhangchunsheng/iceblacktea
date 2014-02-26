/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-06-25
 * Description: monster
 */
var monsterService = require('../app/services/MonsterService');

exports.index = function(req, res) {
    var monsters = [];
    monsterService.getAllMonsters(function(data) {
        monsters = data;
        console.log(monsters);
        res.render('monster', {
            title: 'monster',
            monsters: JSON.stringify(monsters)
        });
    });
}

exports.update = function(req, res) {
    var id = req.params.id;
    var monster = req.body.monster;
    monster = JSON.parse(monster);
    monsterService.update(monster, function(data) {
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}

exports.import = function(req, res) {
    var monsters = [];
    monsterService.import(function(data) {
        monsters = data;
        console.log(monsters);
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}

exports.export = function(req, res) {
    var monsters = [];
    monsterService.export(function(data) {
        monsters = data;
        console.log(monsters);
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}

exports.exportJson = function(req, res) {
    var monsters = [];
    monsterService.exportJson(function(data) {
        monsters = data;
        console.log(monsters);
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}