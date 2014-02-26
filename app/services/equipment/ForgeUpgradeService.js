/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-12-18
 * Description: forgeUpgradeService
 */
var forgeUpgradeDao = require('../../dao/equipment/ForgeUpgradeDao');
var utils = require('../../utils/utils');

var ForgeUpgradeService = function() {

}

ForgeUpgradeService.prototype.getData = function(next) {
    forgeUpgradeDao.getData(next);
}

ForgeUpgradeService.prototype.update = function(forgeUpgrade, next) {
    forgeUpgradeDao.update(forgeUpgrade, next);
}

/**
 * 导入数据
 * @param next
 */
ForgeUpgradeService.prototype.import = function(next) {
    forgeUpgradeDao.truncate(function(result) {
        utils.readFile("app/config/data/forges.txt", function(data) {
            data.shift();
            insertData(data, next);
        });
    });
}

var heroId;
var page;
var color;
function insertData(data, next) {
    if(data.length == 0) {
        next({});
        return;
    }
    var rows = [];
    var forgeUpgrade = {};

    var row = data.shift();

    rows = row.split(",");
    if(row.indexOf(",") < 0) {
        insertData(data, next);
    }

    var forgeUpgradeMaterial = [];
    var materials = [];
    for(var i = 1 ; i <= 12 ; i++) {
        if(i % 3 == 0) {
            materials.push(rows[i]);
            forgeUpgradeMaterial.push(materials);
        } else if(i % 3 == 1) {
            materials = [];
            materials.push(rows[i]);
        } else if(i % 3 == 2) {
            materials.push(rows[i]);
        }
    }
    forgeUpgrade = {
        equipmentId: rows[0] == "" ? 0 : rows[0],
        forgeUpgradeMaterial: JSON.stringify(forgeUpgradeMaterial)
    };
    forgeUpgradeDao.insert(forgeUpgrade, function() {
        insertData(data, next);
    });
}

/**
 * 导出数据
 * @param next
 */
ForgeUpgradeService.prototype.export = function(next) {
    this.getData(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].equipmentId;
        }
        utils.writeJSONFile(data, "forges", next);
    });
}

ForgeUpgradeService.prototype.exportJson = function(next) {
    this.getData(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].equipmentId;
        }
        utils.writeJSONArrayFile(data, "forges", next);
    });
}

module.exports = new ForgeUpgradeService();