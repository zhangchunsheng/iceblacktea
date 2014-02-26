/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-09-17
 * Description: skill_list
 */
var skillListService = require('../../app/services/skill/SkillListService');

/**
 *
 * @param req
 * @param res
 */
exports.index = function(req, res) {
    var objects = [];
    skillListService.getData(function(data) {
        objects = data;
        console.log(objects);
        res.render('skill_list', {
            title: 'skill_list',
            name: 'skill_lists',
            dataName: '技能列表数据',
            saveRoute: 'skill_list',
            exportRoute: 'skill_lists',
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
    skillListService.update(object, function(data) {
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
exports.import_skill_list = function(req, res) {
    var objects = [];
    skillListService.import_skill_list(function(data) {
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
exports.import_skill_level = function(req, res) {
    var objects = [];
    skillListService.import_skill_level(function(data) {
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
exports.import_skill_effect = function(req, res) {
    var objects = [];
    skillListService.import_skill_effect(function(data) {
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
    skillListService.export(function(data) {
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
exports.export_heroSkills = function(req, res) {
    var objects = [];
    skillListService.export_heroSkills(function(data) {
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
    skillListService.exportJson(function(data) {
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
exports.tidyData = function(req, res) {
    var objects = [];
    skillListService.tidyData(function(data) {
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
exports.export_skill = function(req, res) {
    var objects = [];
    skillListService.export_skill(function(data) {
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
exports.export_skillJson = function(req, res) {
    var objects = [];
    skillListService.export_skillJson(function(data) {
        objects = data;
        console.log(objects);
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}