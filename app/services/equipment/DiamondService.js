/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-12-18
 * Description: diamondService
 */
var diamondDao = require('../../dao/equipment/DiamondDao');
var utils = require('../../utils/utils');

var DiamondService = function() {

}

DiamondService.prototype.getData = function(next) {
    diamondDao.getData(next);
}

DiamondService.prototype.update = function(diamond, next) {
    diamondDao.update(diamond, next);
}

/**
 * 导入数据
 * @param next
 */
DiamondService.prototype.import = function(next) {
    diamondDao.truncate(function(result) {
        utils.readFile("app/config/data/diamonds.txt", function(data) {
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
    var diamond = {};

    var row = data.shift();

    rows = row.split(",");
    if(row.indexOf(",") < 0) {
        insertData(data, next);
    }

    diamond = {
        diamondId: rows[0],
        name: rows[1] == "" ? 0 : rows[1],
        description: rows[2] == "" ? 0 : rows[2],
        icon: rows[3] == "" ? 0 : rows[3],
        quality: rows[4] == "" ? 0 : rows[4],
        attrId: rows[5] == "" ? 0 : rows[5],
        attrValue: rows[6] == "" ? 0 : rows[6],
        overlayNum: rows[7] == "" ? 0 : rows[7],
        pileNum: rows[7] == "" ? 0 : rows[7],
        price: rows[8] == "" ? 0 : rows[8]
    };
    diamondDao.insert(diamond, function() {
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
DiamondService.prototype.export = function(next) {
    this.getData(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].diamondId;
        }
        utils.writeJSONFile(data, "diamonds", next);
    });
}

DiamondService.prototype.exportJson = function(next) {
    this.getData(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].diamondId;
        }
        utils.writeJSONArrayFile(data, "diamonds", next);
    });
}

module.exports = new DiamondService();