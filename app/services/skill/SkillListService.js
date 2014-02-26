/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-09-18
 * Description: skillListService
 */
var skillListDao = require('../../dao/skill/SkillListDao');
var skillEffectDao = require('../../dao/skill/SkillEffectDao');
var utils = require('../../utils/utils');
var dataInfo = require('../../../shared/data');

var SkillListService = function() {

}

SkillListService.prototype.getData = function(next) {
    skillListDao.getData(next);
}

SkillListService.prototype.getExportData = function(next) {
    skillListDao.getExportData(next);
}

SkillListService.prototype.getHeroSkillData = function(next) {
    skillListDao.getHeroSkillData(next);
}

SkillListService.prototype.update = function(skill, next) {
    skillListDao.update(skill, next);
}

/**
 * 导入技能列表数据
 * @param next
 */
SkillListService.prototype.import_skill_list = function(next) {
    skillListDao.truncate(function(result) {
        utils.readFile("app/config/data/skill_list.txt", function(data) {
            data.shift();
            insertData(data, next);
        });
    });
}

function insertData(data, next) {
    if(data.length == 0) {
        next({});
        return;
    }
    var rows = [];
    var skill_list = {};
    var skillId = "";
    var heroId = "";
    var hero_skillId = "";
    var level = 0;
    var type = 0;
    var scope = 0;
    var skillType = 0;
    var skillNo = 0;

    var row = data.shift();

    rows = row.split(",");
    if(row.indexOf(",") < 0) {
        insertData(data, next);
    }
    skillId = rows[0];
    hero_skillId = skillId.substr(0, skillId.length - 1);
    heroId = skillId.substr(2, 2);
    type = skillId.substr(4, 1);
    skillNo = skillId.substr(5, 1);
    level = skillId.substr(6, 1);
    scope = rows[4] == "" ? 0 : rows[4];
    skillType = rows[5] == "" ? 0 : rows[5];

    if(heroId.substr(0, 1) == 0) {
        heroId = heroId.substr(1, 1);
    }
    skill_list = {
        skillId: skillId,
        skillName: rows[1] == "" ? "技能" + hero_skillId : rows[1],
        heroId: heroId,
        type: type,
        skillNo: skillNo,
        level: level,
        icon: rows[2] == "" ? "" : rows[2],
        description: rows[3] == "" ? "" : rows[3],
        scope: scope,
        skillType: skillType
    };
    skillListDao.insert(skill_list, function() {
        insertData(data, next);
    });
}

/**
 * 导入技能等级数据
 * @param next
 */
SkillListService.prototype.import_skill_level = function(next) {
    utils.readFile("app/config/data/skill_level.txt", function(data) {
        var rows = [];
        var skill_level = {};
        var skillId = "";
        var nextSkillId = "";
        var hero_skillId = "";
        var speed = [];
        var requirement = [];
        for(var i = 1 ; i < data.length ; i++) {
            requirement = [];
            rows = data[i].split(",");
            if(data[i].indexOf(",") < 0) {
                continue;
            }
            skillId = rows[0];
            hero_skillId = skillId.substr(0, skillId.length - 1);
            speed = [{
                type: "ea",
                value: rows[2] == "" ? 0 : rows[2]
            }, {
                type: "ehr",
                value: rows[3] == "" ? 0 : rows[3]
            }, {
                type: "eshr",
                value: rows[4] == "" ? 0 : rows[4]
            }];

            // coins level skills items
            if(rows[5] != "" && rows[5] != 0) {
                requirement.push({
                    type: "coins",
                    value: rows[5]
                });
            }
            if(rows[6] != "" && rows[6] != 0) {
                requirement.push({
                    type: "level",
                    value: rows[6]
                });
            }
            if(rows[7] != "" && rows[7] != 0) {
                requirement.push({
                    type: "skills",
                    value: rows[7]
                });
            }
            if(rows[8] != "" && rows[8] != 0) {
                requirement.push({
                    type: "items",
                    value: rows[8]
                });
            }
            nextSkillId = rows[9];
            skill_level = {
                skillId: skillId,
                hero_skillId: hero_skillId,
                speed: JSON.stringify(speed),
                requirement: JSON.stringify(requirement),
                nextSkillId: nextSkillId
            };
            skillListDao.update(skill_level);
        }
        next({});
    });
}

/**
 * 导入技能效果数据
 * @param next
 */
SkillListService.prototype.import_skill_effect = function(next) {
    skillEffectDao.truncate(function(result) {
        utils.readFile("app/config/data/skill_effect.txt", function(data) {
            var rows = [];
            var skill_effect = {};

            var effectId = "";
            var lastSkillId = "";
            var skillId = "";
            var level = "";
            var attr = "";
            var valueType = 0;
            var value = 0;
            var targetType = 0;
            var targetValue = 0;
            var timeType = 0;
            var timeValue = 0;

            var effects = [];

            for(var i = 1 ; i < data.length ; i++) {
                rows = data[i].split(",");
                if(data[i].indexOf(",") < 0) {
                    continue;
                }
                effectId = rows[0];
                skillId = effectId.replace("XG", "SK");
                skillId = skillId.substr(0, skillId.length - 1);

                if(lastSkillId == skillId) {

                } else {
                    effects = [];
                    lastSkillId = skillId;
                }

                if(rows[3] == "") {
                    attr = "";
                } else {
                    attr = dataInfo.effect_attr[rows[3]].name;
                }
                effects.push({
                    id: effectId,
                    attr: attr,
                    valueType: rows[8] == "" ? 0 : rows[8],
                    value: rows[9] == "" ? 0 : rows[9],
                    targetType: rows[4] == "" ? 0 : rows[4],
                    target: rows[5] == "" ? 0 : rows[5],
                    timeType: rows[6] == "" ? 0 : rows[6],
                    timeValue: rows[7] == "" ? 0 : rows[7]
                });

                skill_effect = {
                    skillId: skillId,
                    effects: JSON.stringify(effects)
                };
                skillListDao.update(skill_effect);
            }
            data.shift();
            insertSkillEffectData(data, next);
        });
    });
}

function insertSkillEffectData(data, next) {
    if(data.length == 0) {
        next({});
        return;
    }
    var rows = [];
    var skill_effect = {};
    var effectId = "";
    var skillId = "";
    var level = "";
    var attr = "";
    var valueType = 0;
    var value = 0;
    var targetType = 0;
    var targetValue = 0;
    var timeType = 0;
    var timeValue = 0;

    var row = data.shift();

    rows = row.split(",");
    if(row.indexOf(",") < 0) {
        insertSkillEffectData(data, next);
    }
    effectId = rows[0];
    skillId = effectId.replace("XG", "SK");
    skillId = skillId.substr(0, skillId.length - 1);
    level = rows[1];

    valueType = rows[8] == "" ? 0 : rows[8];
    value = rows[9] == "" ? 0 : rows[9];
    targetType = rows[4] == "" ? 0 : rows[4];
    targetValue = rows[5] == "" ? 0 : rows[5];
    timeType = rows[6] == "" ? 0 : rows[6];
    timeValue = rows[7] == "" ? 0 : rows[7];

    if(rows[3] == "") {
        attr = "";
    } else {
        attr = dataInfo.effect_attr[rows[3]].name;
    }

    skill_effect = {
        skillId: skillId,
        effectId: effectId,
        level: level,
        serialNumber: rows[2],
        attr: attr,
        valueType: valueType,
        value: value,
        targetType: targetType,
        targetValue: targetValue,
        timeType: timeType,
        timeValue: timeValue
    };
    skillEffectDao.insert(skill_effect, function() {
        insertSkillEffectData(data, next);
    });
}

/**
 * 导出数据
 * @param next
 */
SkillListService.prototype.export = function(next) {
    this.getExportData(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].skillId;
        }
        utils.writeJSONFile(data, "skillList", next);
    });
}

/**
 * 导出数据
 * @param next
 */
SkillListService.prototype.export_heroSkills = function(next) {
    this.getHeroSkillData(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i].id = data[i].heroId;
        }
        // utils.writeJSONFile(data, "heroSkills", next);
        utils.writeJSONWithIdFile(data, "heroSkills", next);
    });
}

SkillListService.prototype.exportJson = function(next) {
    this.getData(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].skillId;
        }
        utils.writeJSONArrayFile(data, "skillList", next);
    });
}

/**
 * 整理数据
 * @param next
 */
SkillListService.prototype.tidyData = function(next) {
    this.getData(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].skillId;
        }
        utils.writeJSONArrayFile(data, "skillList", next);
    });
}

/**
 * 导出数据
 * @param next
 */
SkillListService.prototype.export_skill = function(next) {
    this.getData(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].skillId;
        }
        utils.writeJSONFile(data, "hero_skill", next);
    });
    utils.writeJSONFile(data, "skills", next);
    utils.writeJSONFile(data, "skill_effects", next);
}

SkillListService.prototype.export_skillJson = function(next) {
    this.getData(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].skillId;
        }
        utils.writeJSONArrayFile(data, "hero_skill", next);
    });
}

module.exports = new SkillListService();