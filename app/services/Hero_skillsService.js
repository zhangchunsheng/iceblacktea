/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-06-24
 * Description: Hero_skillService
 */
var hero_skillDao = require('../dao/Hero_skillDao');
var skillDao = require('../dao/skill/SkillDao');
var async = require('async');

var Hero_skillService = function() {

}

Hero_skillService.prototype.getSkills = function(heroId, next) {
    hero_skillDao.getSkills(heroId, next);
}

Hero_skillService.prototype.getSkillLevels = function(skillId, next) {
    hero_skillDao.getSkillLevels(skillId, next);
}

Hero_skillService.prototype.addSkills = function(data, next) {
    var skill = {
        skillId: data.skillId,
        name: data.name,
        description: data.description,
        type: data.type,
        scope: data.scope
    };
    var hero_skill = {
        cId: data.heroId,
        skillId: data.skillId
    };
    async.parallel([
        function(callback) {
            hero_skillDao.addSkills(skill, function(data) {
                callback(null, data);
            });
        },
        function(callback) {
            hero_skillDao.addHero_skill(hero_skill, function(data) {
                callback(null, data);
            });
        },
        function(callback) {
            var skill_levels = [];
            for(var i = 0 ; i < 4 ; i++) {
                skill_levels.push({
                    skillId: data.skillId,
                    level: i + 1,
                    description: '',
                    speed: '[{"type":"ea","value":0},{"type":"ehr","value":0},{"type":"eshr","value":0}]',
                    effects: '[]',
                    requirement: '[]'
                });
            }
            addSkill_levels(skill_levels, callback);
        }
    ], function(err, results) {
        next();
    });
}

Hero_skillService.prototype.addSkillLevel = function(data, next) {
    hero_skillDao.addSkillLevel(data, next);
}

Hero_skillService.prototype.updateSkillLevel = function(data, next) {
    hero_skillDao.updateSkillLevel(data, next);
}

var addSkill_levels = function(data, next) {
    if(data.length == 0) {
        next(null, {});
        return;
    }
    var skill_level = data.shift();
    hero_skillDao.addSkill_levels(skill_level, function() {
        addSkill_levels(data, next);
    });
}

Hero_skillService.prototype.updateSkills = function(id, data, next) {
    delete data.heroId;
    hero_skillDao.updateSkills(id, data, next);
}

module.exports = new Hero_skillService();