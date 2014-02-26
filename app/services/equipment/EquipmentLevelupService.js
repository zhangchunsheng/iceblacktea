/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-07-17
 * Description: equipmentLevelupService
 */
var equipmentLevelupDao = require('../../dao/equipment/EquipmentLevelupDao');
var utils = require('../../utils/utils');

var EquipmentLevelupService = function() {

}

EquipmentLevelupService.prototype.getData = function(next) {
    equipmentLevelupDao.getData(next);
}

EquipmentLevelupService.prototype.update = function(equipment_levelup, next) {
    delete equipment_levelup.name;
    equipmentLevelupDao.update(equipment_levelup, next);
}

/**
 * 导入数据
 * @param next
 */
EquipmentLevelupService.prototype.import = function(next) {
    equipmentLevelupDao.truncate(function(result) {
        utils.readFile("app/config/data/weapons_levelup.txt", function(data) {
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
    var eqId = "";
    var equipmentId = "";
    var level = 0;
    var equipment_levelup = {};

    var row = data.shift();

    rows = row.split(",");
    if(row.indexOf(",") < 0) {
        insertData(data, next);
        return;
    }

    if(rows[0] != "")
        equipmentId = rows[0];
    eqId = rows[0];
    level = rows[6];
    equipmentId = eqId.substr(0, eqId.length - rows[2].length);
    equipment_levelup = {
        eqId: eqId,
        equipmentId: equipmentId,
        equipmentName: rows[1],
        resourcePath: rows[3] == "" ? "" : rows[3],
        description: rows[4] == "" ? "" : rows[4],
        quality: rows[5] == "" ? 0 : rows[5],
        level: level,
        useLevel: rows[7],
        isBinding: 1,
        price: rows[8],
        destroyTime: rows[9],
        strengthenLevel: rows[2] == "" ? 1 : rows[2],
        attack: rows[10] == "" ? 0 : rows[10],
        attackPercentage: rows[11] == "" ? 0 : rows[11].replace("%", ""),
        speedLevel: rows[12] == "" ? 0 : rows[12],
        speedLevelPercentage: rows[13] == "" ? 0 : rows[13].replace("%", ""),
        hp: rows[14] == "" ? 0 : rows[14],
        hpPercentage: rows[15] == "" ? 0 : rows[15].replace("%", ""),
        defense: rows[16] == "" ? 0 : rows[16],
        defensePercentage: rows[17].replace("%", ""),
        focus: rows[18] == "" ? 0 : rows[18].replace("%", ""),
        criticalHit: rows[19] == "" ? 0 : rows[19].replace("%", ""),
        critDamage: rows[20] == "" ? 0 : rows[20],
        dodge: rows[21] == "" ? 0 : rows[21].replace("%", ""),
        block: rows[22] == "" ? 0 : rows[22].replace("%", ""),
        counter: rows[23] == "" ? 0 : rows[23].replace("%", ""),
        counterDamage: rows[24] == "" ? 0 : rows[24],
        stunt: rows[25],
        confusion: rows[26],
        upgradeMaterial: rows[27],
        nextEqId: rows[30]
    };
    equipmentLevelupDao.insert(equipment_levelup, function() {
        insertData(data, next);
    });
}

/**
 * 导出数据
 * @param next
 */
EquipmentLevelupService.prototype.export = function(next) {
    this.getData(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            //data[i].id = data[i].equipmentId + data[i].strengthenLevel;
            data[i].id = data[i].equipmentId;
        }
        utils.writeJSONFile(data, "equipmentLevelup", next);
    });
}

EquipmentLevelupService.prototype.exportJson = function(next) {
    this.getData(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            //data[i].id = data[i].equipmentId + data[i].strengthenLevel;
            data[i].id = data[i].equipmentId;
        }
        utils.writeJSONArrayFile(data, "equipmentLevelup", next);
    });
}

module.exports = new EquipmentLevelupService();