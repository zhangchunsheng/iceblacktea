/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-08-29
 * Description: skillService
 */
var skillDao = require('../../dao/skill/SkillDao');

var SkillService = function() {

}

SkillService.prototype.getData = function(next) {
    skillDao.getData(next);
}

SkillService.prototype.update = function(skill, next) {
    skillDao.update(skill, next);
}

module.exports = new SkillService();