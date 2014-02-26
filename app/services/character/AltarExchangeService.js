/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2014-02-17
 * Description: altarExchangeService
 */
var altarExchangeDao = require('../../dao/character/AltarExchangeDao');
var utils = require('../../utils/utils');

var AltarExchangeService = function() {

}

AltarExchangeService.prototype.getData = function(next) {
    altarExchangeDao.getData(next);
}

AltarExchangeService.prototype.update = function(altarExchange, next) {
    altarExchangeDao.update(altarExchange, next);
}

/**
 * 导入数据
 * @param next
 */
AltarExchangeService.prototype.import = function(next) {
    altarExchangeDao.truncate(function(result) {
        utils.readFile("app/config/data/altar_exchange.txt", function(data) {
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
    var altarExchange = {};

    var row = data.shift();

    rows = row.split(",");
    altarExchange = {
        heroId: rows[0],
        needLoyalty: rows[1]
    };
    altarExchangeDao.insert(altarExchange, function() {
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
AltarExchangeService.prototype.export = function(next) {
    this.getData(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].heroId;
        }
        utils.writeJSONFile(data, "altar_exchange", next);
    });
}

AltarExchangeService.prototype.exportJson = function(next) {
    this.getDatas(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].heroId;
        }
        utils.writeJSONArrayFile(data, "altar_exchange", next);
    });
}

module.exports = new AltarExchangeService();