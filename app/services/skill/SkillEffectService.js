/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-09-18
 * Description: skillEffectService
 */
var skillEffectDao = require('../../dao/skill/SkillEffectDao');
var utils = require('../../utils/utils');

var SkillEffectService = function() {

}

SkillEffectService.prototype.getData = function(next) {
    skillEffectDao.getData(next);
}

SkillEffectService.prototype.update = function(skill, next) {
    skillEffectDao.update(skill, next);
}

/**
 * 导入数据
 * @param next
 */
SkillEffectService.prototype.import = function(next) {
    skillEffectDao.truncate(function(result) {
        utils.readFile("app/config/data/skill_effect.txt", function(data) {
            var rows = [];
            var equipment = {};
            for(var i = 1 ; i < data.length ; i++) {
                rows = data[i].split(",");
                if(data[i].indexOf(",") < 0) {
                    continue;
                }
                equipment = {
                    equipmentId: rows[0],
                    equipmentName: rows[1],
                    resourcePath: rows[2] == "" ? "" : rows[2],
                    quality: rows[3] == "" ? 0 : rows[3],
                    level: rows[4],
                    useLevel: rows[5],
                    isBinding: rows[6] == "" ? 1 : rows[6],
                    price: rows[7],
                    destroyTime: rows[8]
                };
                skillEffectDao.insert(equipment);
            }
            next({});
        });
    });
}

/**
 * 导出数据
 * @param next
 */
SkillEffectService.prototype.export = function(next) {
    this.getData(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].skillId;
        }
        utils.writeJSONFile(data, "skillEffect", next);
    });
}

SkillEffectService.prototype.exportJson = function(next) {
    this.getData(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].skillId;
        }
        utils.writeJSONArrayFile(data, "skillEffect", next);
    });
}

module.exports = new SkillEffectService();