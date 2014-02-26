/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-12-09
 * Description: tacticalService
 */
var tacticalDao = require('../../dao/formation/TacticalDao');
var utils = require('../../utils/utils');

var TacticalService = function() {

}

TacticalService.prototype.getData = function(next) {
    tacticalDao.getData(next);
}

TacticalService.prototype.update = function(tactical, next) {
    tactical.tacticalName = tactical.name;
    delete tactical.name;
    tacticalDao.update(tactical, next);
}

/**
 * 导入数据
 * @param next
 */
TacticalService.prototype.import = function(next) {
    tacticalDao.truncate(function(result) {
        utils.readFile("app/config/data/tacticals.txt", function(data) {
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
    var tactical = {};

    var row = data.shift();

    rows = row.split(",");
    if(row.indexOf(",") < 0) {
        insertData(data, next);
    }

    tactical = {
        tacticalId: rows[0],
        tacticalName: rows[1],
        description: rows[2] == "" ? "" : rows[2],
        resourcePath: rows[3] == "" ? "" : rows[3],
        quality: rows[4] == "" ? 0 : rows[4],
        level: rows[5],
        useLevel: rows[6],
        isBinding: rows[7] == "" ? 1 : rows[7],
        price: rows[8],
        destroyTime: rows[9]
    };
    tacticalDao.insert(tactical, function() {
        insertData(data, next);
    });
}

/**
 * 导出数据
 * @param next
 */
TacticalService.prototype.export = function(next) {
    this.getData(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].tacticalId;
        }
        utils.writeJSONFile(data, "tacticals", next);
    });
}

TacticalService.prototype.exportJson = function(next) {
    this.getData(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].tacticalId;
        }
        utils.writeJSONArrayFile(data, "tacticals", next);
    });
}

module.exports = new TacticalService();