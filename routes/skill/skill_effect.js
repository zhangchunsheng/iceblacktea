/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-09-18
 * Description: skill_effect
 */
var skillEffectService = require('../../app/services/skill/SkillEffectService');

/**
 *
 * @param req
 * @param res
 */
exports.index = function(req, res) {
    var objects = [];
    skillEffectService.getData(function(data) {
        objects = data;
        console.log(objects);
        res.render('skill_effect', {
            title: 'skill_effect',
            name: 'skill_effects',
            dataName: '技能效果数据',
            saveRoute: 'skill_effect',
            exportRoute: 'skill_effects',
            objects: JSON.stringify(objects)
        });
    });
}

/**
 *
 * @param req
 * @param res
 */
exports.update = function(req, res) {
    var id = req.params.id;
    var object = req.body.object;
    object = JSON.parse(object);
    skillEffectService.update(object, function(data) {
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}

/**
 *
 * @param req
 * @param res
 */
exports.import = function(req, res) {
    var objects = [];
    skillEffectService.import(function(data) {
        objects = data;
        console.log(objects);
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}

/**
 *
 * @param req
 * @param res
 */
exports.export = function(req, res) {
    var objects = [];
    skillEffectService.export(function(data) {
        objects = data;
        console.log(objects);
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}

/**
 *
 * @param req
 * @param res
 */
exports.exportJson = function(req, res) {
    var objects = [];
    skillEffectService.exportJson(function(data) {
        objects = data;
        console.log(objects);
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}