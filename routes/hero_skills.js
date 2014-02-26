/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-08-29
 * Description: hero_skills
 */
var heroService = require('../app/services/HeroService');
var hero_skillsService = require('../app/services/Hero_skillsService');
var skill_attrService = require('../app/services/skill/Skill_attrService');

exports.index = function(req, res) {
    var heros = [];
    heroService.getAllHeros(function(data) {
        skill_attrService.getData(function(skill_attrs) {
            heros = data;
            console.log(heros);
            res.render('hero_skills', {
                title: 'hero_skills',
                dataName: '英雄技能数据',
                heros: JSON.stringify(heros),
                skill_attrs: JSON.stringify(skill_attrs)
            });
        })
    });
}

exports.getSkills = function(req, res) {
    var heroId = req.params.id;
    hero_skillsService.getSkills(heroId, function(data) {
        var skills = [];
        skills = data;
        res.send(JSON.stringify(skills));
    });
}

exports.getSkillLevels = function(req, res) {
    var skillId = req.params.id;
    hero_skillsService.getSkillLevels(skillId, function(data) {
        var skillLevels = [];
        skillLevels = data;
        res.send(JSON.stringify(skillLevels));
    });
}

exports.addSkills = function(req, res) {
    var data = req.body.data;
    console.log(data);
    hero_skillsService.addSkills(data, function(data) {
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}

exports.updateSkills = function(req, res) {
    var id = req.params.id;
    var data = req.body.data;
    hero_skillsService.updateSkills(id, data, function(data) {
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}

exports.addSkillLevel = function(req, res) {
    var data = req.body.data;
    console.log(data);
    hero_skillsService.addSkillLevel(data, function(data) {
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}

exports.updateSkillLevel = function(req, res) {
    var data = req.body.data;
    console.log(data);
    hero_skillsService.updateSkillLevel(data, function(data) {
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}