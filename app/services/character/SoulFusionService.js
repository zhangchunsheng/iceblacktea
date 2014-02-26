/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2014-02-13
 * Description: soulFusionService
 */
var soulFusionDao = require('../../dao/character/SoulFusionDao');
var utils = require('../../utils/utils');

var SoulFusionService = function() {

}

SoulFusionService.prototype.getData = function(next) {
    soulFusionDao.getData(next);
}

SoulFusionService.prototype.update = function(soulFusion, next) {
    soulFusionDao.update(soulFusion, next);
}

/**
 * 导入数据
 * @param next
 */
SoulFusionService.prototype.import = function(next) {
    soulFusionDao.truncate(function(result) {
        utils.readFile("app/config/data/soulFusion.txt", function(data) {
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
    var soulFusion = {};

    var row = data.shift();

    rows = row.split(",");
    if(row.indexOf(",") < 0) {
        insertData(data, next);
    } else {
        soulFusion = {
            trait: rows[0],
            starLevel: rows[1],
            soulName: rows[2],
            upgradeStarNeedExp: rows[3],
            experience: rows[4]
        };
        soulFusionDao.insert(soulFusion, function() {
            insertData(data, next);
        });
    }
}

function getNum(num) {
    //return (num / 30).toFixed(2);
    return num;
}

/**
 * 导出数据
 * @param next
 */
SoulFusionService.prototype.export = function(next) {
    this.getData(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = "" + data[i].trait + data[i].starLevel;
        }
        utils.writeJSONFile(data, "soulFusion", next);
    });
}

SoulFusionService.prototype.exportJson = function(next) {
    this.getData(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = "" + data[i].trait + data[i].starLevel;
        }
        utils.writeJSONArrayFile(data, "soulFusion", next);
    });
}

module.exports = new SoulFusionService();