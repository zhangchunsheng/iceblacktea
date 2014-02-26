/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-11-21
 * Description: skillV2Service
 */
var skillV2Dao = require('../../dao/v2/SkillV2Dao');
var utils = require('../../utils/utils');

var SkillV2Service = function() {

}

SkillV2Service.prototype.getAllSkills = function(next) {
    skillV2Dao.getAllSkills(function(err, skills) {
        next(err, skills);
    });
}

SkillV2Service.prototype.getData = function(next) {
    skillV2Dao.getData(next);
}

SkillV2Service.prototype.update = function(skillV2, next) {
    skillV2.skillName = skillV2.name;
    delete skillV2.name;
    skillV2Dao.update(skillV2, next);
}

/**
 * 导入数据
 * @param next
 */
SkillV2Service.prototype.import = function(next) {
    skillV2Dao.truncate(function(result) {
        utils.readFile("app/config/data/skills.txt", function(data) {
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
    var skillV2 = {};

    var row = data.shift();

    rows = row.split(",");
    if(row.indexOf(",") < 0) {
        insertData(data, next);
    }

    //14 0 11 1 12 13 24
    var upgradeSkillRequired = [];//materials level money
    var forgetSkillRequired = [];
    var materials = "";
    var level = 0;
    var money = 0;
    if(typeof rows[11] != "undefined") {
        for(var i = 0 ; i < 4 ; i++) {
            materials = rows[12 + i * 3];
            level = parseInt(rows[13 + i * 3]);
            money = parseInt(rows[14 + i * 3]);
            upgradeSkillRequired.push({
                materials: materials,
                level: level,
                money: money
            });
        }
    }

    if(typeof rows[24] != "undefined") {
        materials = rows[24];
        forgetSkillRequired.push({
            materials: materials
        });
    }

    skillV2 = {
        skillId: rows[0],
        skillName: rows[1],
        icon: rows[2] == "" ? "" : rows[2],
        skillDescription: rows[3] == "" ? 1 : rows[3],
        type: rows[4] == "" ? 1 : rows[4],
        onsetType: rows[5] == "" ? 1 : rows[5],
        triggerCondition: rows[6],
        initialLevel: rows[7],
        initialEffectDesc: rows[8],
        ultimateEffectDesc: rows[9],
        getMethodDesc: rows[10],
        script_name: "skill" + rows[0].replace("SK", ""),
        upgradeSkillRequired: JSON.stringify(upgradeSkillRequired),
        forgetSkillRequired: JSON.stringify(forgetSkillRequired)
    };
    skillV2Dao.insert(skillV2, function() {
        insertData(data, next);
    });
}

/**
 * 导出数据
 * @param next
 */
SkillV2Service.prototype.export = function(next) {
    this.getData(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].skillId;
            data[i].skillName = data[i].name;
            delete data[i].name;
        }
        utils.writeJSONFile(data, "skillsV2", next);
    });
}

SkillV2Service.prototype.exportJson = function(next) {
    this.getData(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].skillId;
            data[i].skillName = data[i].name;
            delete data[i].name;
        }
        utils.writeJSONArrayFile(data, "skillsV2", next);
    });
}

module.exports = new SkillV2Service();