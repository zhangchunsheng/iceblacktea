/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-07-17
 * Description: equipmentService
 */
var equipmentDao = require('../../dao/v2/EquipmentV2Dao');
var utils = require('../../utils/utils');

var EquipmentService = function() {

}

EquipmentService.prototype.getData = function(next) {
    equipmentDao.getData(next);
}

EquipmentService.prototype.update = function(equipment, next) {
    equipment.equipmentName = equipment.name;
    delete equipment.name;
    equipmentDao.update(equipment, next);
}

/**
 * 导入数据
 * @param next
 */
EquipmentService.prototype.import = function(next) {
    equipmentDao.truncate(function(result) {
        utils.readFile("app/config/data/equipments.txt", function(data) {
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
    var equipment = {};

    var row = data.shift();

    rows = row.split(",");
    if(row.indexOf(",") < 0) {
        insertData(data, next);
    }

    equipment = {
        equipmentId: rows[0],
        equipmentName: rows[1],
        description: rows[2] == "" ? "" : rows[2],
        resourcePath: rows[3] == "" ? "" : rows[3],
        quality: rows[4] == "" ? 0 : rows[4],
        level: rows[5],
        forgeLevel: rows[6],
        isBinding: rows[7] == "" ? 1 : rows[7],
        price: rows[8],
        destroyTime: rows[9],
        attrId: rows[10] == null || rows[10] == "" ? 0 : rows[10],
        attrValue: rows[11] == null || rows[11] == "" ? 0 : rows[11],
        attrAddValue: rows[12] == null || rows[12] == "" ? 0 : rows[12],
        attrAddForgeValue: rows[13] == null || rows[13] == "" ? 0 : rows[13],
        appendAttrId: rows[14] == null || rows[14] == "" ? 0 : rows[14],
        appendAttrValue: rows[15] == null || rows[15] == "" ? 0 : rows[15],
        appendAttrAddValue: rows[16] == null || rows[16] == "" ? 0 : rows[16],
        appendAttrAddForgeValue: rows[17] == null || rows[17] == "" ? 0 : rows[17],
        nextEqId: rows[18] == null || rows[18] == "" ? 0 : rows[18]
    };
    equipmentDao.insert(equipment, function() {
        insertData(data, next);
    });
}

/**
 * 导出数据
 * @param next
 */
EquipmentService.prototype.export = function(next) {
    this.getData(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].equipmentId;
        }
        utils.writeJSONFile(data, "equipments", next);
    });
}

EquipmentService.prototype.exportJson = function(next) {
    this.getData(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].equipmentId;
        }
        utils.writeJSONArrayFile(data, "equipments", next);
    });
}

module.exports = new EquipmentService();