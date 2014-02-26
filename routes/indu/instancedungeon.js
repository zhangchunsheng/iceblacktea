/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-07-11
 * Description: instancedungeon
 */
var instancedungeonService = require('../../app/services/indu/InstancedungeonService');
var induMonstergroupService = require('../../app/services/indu/InduMonstergroupService');

exports.index = function(req, res) {
    var instancedungeon = [];
    instancedungeonService.getAllInstancedungeons(function(data) {
        instancedungeons = data;
        console.log(instancedungeons);
        res.render('instancedungeon', {
            title: 'instancedungeon',
            instancedungeons: JSON.stringify(instancedungeons)
        });
    });
}

exports.update = function(req, res) {
    var id = req.params.id;
    var instancedungeon = req.body.instancedungeon;
    instancedungeon = JSON.parse(instancedungeon);
    instancedungeonService.update(instancedungeon, function(data) {
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}

exports.import = function(req, res) {
    var instancedungeons = [];
    instancedungeonService.import(function(data) {
        instancedungeons = data;
        console.log(instancedungeons);
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}

exports.export = function(req, res) {
    var instancedungeons = [];
    instancedungeonService.export(function(data) {
        instancedungeons = data;
        console.log(instancedungeons);
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}

exports.exportJson = function(req, res) {
    var instancedungeons = [];
    instancedungeonService.exportJson(function(data) {
        instancedungeons = data;
        console.log(instancedungeons);
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}

/**
 * 怪物组
 * @param req
 * @param res
 */
exports.monstergroup = function(req, res) {
    var monstergroups = [];
    induMonstergroupService.getAllMonstergroups(function(data) {
        monstergroups = data;
        console.log(monstergroups);
        res.render('indu_monstergroup', {
            title: 'monstergroup',
            monstergroups: JSON.stringify(monstergroups)
        });
    });
}

/**
 * 怪物组
 * @param req
 * @param res
 */
exports.monstergroup_update = function(req, res) {
    var id = req.params.id;
    var monstergroup = req.body.monstergroup;
    monstergroup = JSON.parse(monstergroup);
    induMonstergroupService.update(monstergroup, function(data) {
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}

/**
 * 怪物组
 * @param req
 * @param res
 */
exports.monstergroup_import = function(req, res) {
    var monstergroups = [];
    induMonstergroupService.import(function(data) {
        monstergroups = data;
        console.log(monstergroups);
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}

/**
 * 怪物组
 * @param req
 * @param res
 */
exports.monstergroup_export = function(req, res) {
    var monstergroups = [];
    induMonstergroupService.export(function(data) {
        monstergroups = data;
        console.log(monstergroups);
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}

exports.monstergroup_exportJson = function(req, res) {
    var monstergroups = [];
    induMonstergroupService.exportJson(function(data) {
        monstergroups = data;
        console.log(monstergroups);
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}