/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2014-01-13
 * Description: formationService
 */
var formationDao = require('../../dao/formation/FormationDao');
var utils = require('../../utils/utils');

var FormationService = function() {

}

FormationService.prototype.getData = function(next) {
    formationDao.getData(next);
}

FormationService.prototype.update = function(formation, next) {
    formation.formationName = formation.name;
    delete formation.name;
    formationDao.update(formation, next);
}

/**
 * 导入数据
 * @param next
 */
FormationService.prototype.import = function(next) {
    formationDao.truncate(function(result) {
        utils.readFile("app/config/data/formations.txt", function(data) {
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

    formation = {
        formationId: rows[0],
        formationName: rows[1],
        icon: rows[2] == "" ? "" : rows[2],
        wholeAddition: rows[3] == "" ? "" : rows[3],
        centerAddition: rows[4] == "" ? 0 : rows[4],
        corePosition: rows[5],
        coreAddition: rows[6]
    };
    formationDao.insert(formation, function() {
        insertData(data, next);
    });
}

/**
 * 导出数据
 * @param next
 */
FormationService.prototype.export = function(next) {
    this.getData(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].formationId;
        }
        utils.writeJSONFile(data, "formations", next);
    });
}

FormationService.prototype.exportJson = function(next) {
    this.getData(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].formationId;
        }
        utils.writeJSONArrayFile(data, "formations", next);
    });
}

module.exports = new FormationService();