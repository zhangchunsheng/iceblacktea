/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-08-29
 * Description: skill
 */
var skillService = require('../../app/services/skill/SkillService');

exports.index = function(req, res) {
    var objects = [];
    skillService.getData(function(data) {
        objects = data;
        console.log(objects);
        res.render('object', {
            title: 'skill',
            name: 'skills',
            dataName: '技能数据',
            saveRoute: 'skill',
            exportRoute: 'skills',
            objects: JSON.stringify(objects)
        });
    });
}

exports.update = function(req, res) {
    var id = req.params.id;
    var object = req.body.object;
    object = JSON.parse(object);
    skillService.update(object, function(data) {
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}