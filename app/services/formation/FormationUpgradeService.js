/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2014-01-13
 * Description: formationUpgradeService
 */
var formationUpgradeDao = require('../../dao/formation/FormationUpgradeDao');
var utils = require('../../utils/utils');

var FormationUpgradeService = function() {

}

FormationUpgradeService.prototype.getData = function(next) {
    formationUpgradeDao.getData(next);
}

FormationUpgradeService.prototype.update = function(formation, next) {
    formation.formationName = formation.name;
    delete formation.name;
    formationUpgradeDao.update(formation, next);
}

/**
 * 导入数据
 * @param next
 */
FormationUpgradeService.prototype.import = function(next) {
    formationUpgradeDao.truncate(function(result) {
        utils.readFile("app/config/data/formationUpgrades.txt", function(data) {
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
    var formation = {};

    var row = data.shift();

    rows = row.split(",");
    if(row.indexOf(",") < 0) {
        insertData(data, next);
    }

    var upgradeMaterial = [];
    upgradeMaterial.push([rows[2],rows[3],rows[4]]);
    formation = {
        formationId: rows[0],
        studyCondition: rows[1],
        upgradeMaterial: JSON.stringify(upgradeMaterial)
    };
    formationUpgradeDao.insert(formation, function() {
        insertData(data, next);
    });
}

/**
 * 导出数据
 * @param next
 */
FormationUpgradeService.prototype.export = function(next) {
    this.getData(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].formationId;
        }
        utils.writeJSONFile(data, "formations", next);
    });
}

FormationUpgradeService.prototype.exportJson = function(next) {
    this.getData(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].formationId;
        }
        utils.writeJSONArrayFile(data, "formations", next);
    });
}

module.exports = new FormationUpgradeService();