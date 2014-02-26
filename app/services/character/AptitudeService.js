/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-12-09
 * Description: aptitudeService
 */
var aptitudeDao = require('../../dao/character/AptitudeDao');
var utils = require('../../utils/utils');

var AptitudeService = function() {

}

AptitudeService.prototype.getData = function(next) {
    aptitudeDao.getData(next);
}

AptitudeService.prototype.update = function(aptitude, next) {
    aptitudeDao.update(aptitude, next);
}

/**
 * 导入数据
 * @param next
 */
AptitudeService.prototype.import = function(next) {
    aptitudeDao.truncate(function(result) {
        utils.readFile("app/config/data/aptitudes.txt", function(data) {
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
    var aptitude = {};

    var row = data.shift();

    rows = row.split(",");
    if(row.indexOf(",") < 0) {
        insertData(data, next);
    }

    var aptitudes = {};
    var index = 1;
    for(var i = 1 ; i < 10 ; i++) {
        if(rows[i]) {
            aptitudes[index] = i;
            index++;
        }
    }
    aptitude = {
        heroId: rows[0],
        hp: rows[1] == "" ? 0 : getNum(rows[1]),
        attack: rows[2] == "" ? 0 : getNum(rows[2]),
        defense: rows[3] == "" ? 0 : getNum(rows[3]),
        sunderArmor: rows[4] == "" ? 0 : getNum(rows[4]),
        speed: rows[5] == "" ? 0 : getNum(rows[5]),
        criticalHit: rows[6] == "" ? 0 : getNum(rows[6]),
        block: rows[7] == "" ? 0 : getNum(rows[7]),
        dodge: rows[8] == "" ? 0 : getNum(rows[8]),
        counter: rows[9] == "" ? 0 : getNum(rows[9]),
        aptitudes: JSON.stringify(aptitudes)
    };
    aptitudeDao.insert(aptitude, function() {
        insertData(data, next);
    });
}

function getNum(num) {
    //return (num / 30).toFixed(2);
    return num;
}

/**
 * 导出数据
 * @param next
 */
AptitudeService.prototype.export = function(next) {
    this.getData(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].heroId;
        }
        utils.writeJSONFile(data, "aptitudes", next);
    });
}

AptitudeService.prototype.exportJson = function(next) {
    this.getData(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].heroId;
        }
        utils.writeJSONArrayFile(data, "aptitudes", next);
    });
}

module.exports = new AptitudeService();