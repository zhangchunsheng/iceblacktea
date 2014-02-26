/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-08-29
 * Description: Skill_attrService
 */
var skill_attrDao = require('../../dao/skill/Skill_attrDao');

var Skill_attrService = function() {

}

Skill_attrService.prototype.getData = function(next) {
    skill_attrDao.getData(next);
}

Skill_attrService.prototype.update = function(skill_attr, next) {
    skill_attrDao.update(skill_attr, next);
}

module.exports = new Skill_attrService();