/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-07-17
 * Description: equipmentService
 */
var equipmentDao = require('../../dao/equipment/EquipmentDao');
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
        utils.readFile("app/config/data/weapons.txt", function(data) {
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
        useLevel: rows[6],
        isBinding: rows[7] == "" ? 1 : rows[7],
        price: rows[8],
        destroyTime: rows[9]
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
        utils.writeJSONFile(data, "equipment", next);
    });
}

EquipmentService.prototype.exportJson = function(next) {
    this.getData(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].equipmentId;
        }
        utils.writeJSONArrayFile(data, "equipment", next);
    });
}

module.exports = new EquipmentService();