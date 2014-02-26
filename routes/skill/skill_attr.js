/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-08-29
 * Description: skill_attr
 */
var skill_attrService = require('../../app/services/skill/Skill_attrService');

exports.index = function(req, res) {
    var objects = [];
    skill_attrService.getData(function(data) {
        objects = data;
        console.log(objects);
        res.render('object', {
            title: 'skill_attr',
            name: 'skill_attrs',
            dataName: '技能属性数据',
            saveRoute: 'skill_attr',
            exportRoute: 'skill_attrs',
            objects: JSON.stringify(objects)
        });
    });
}

exports.update = function(req, res) {
    var id = req.params.id;
    var object = req.body.object;
    object = JSON.parse(object);
    skill_attrService.update(object, function(data) {
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}