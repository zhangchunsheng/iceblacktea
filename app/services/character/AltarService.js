/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2014-02-11
 * Description: altarService
 */
var altarDao = require('../../dao/character/AltarDao');
var utils = require('../../utils/utils');

var AltarService = function() {

}

AltarService.prototype.getData = function(next) {
    altarDao.getData(next);
}

AltarService.prototype.getDatas = function(next) {
    altarDao.getDatas(next);
}

AltarService.prototype.update = function(altar, next) {
    altarDao.update(altar, next);
}

/**
 * 导入数据
 * @param next
 */
AltarService.prototype.import = function(next) {
    altarDao.truncate(function(result) {
        utils.readFile("app/config/data/altars.txt", function(data) {
            insertData(data, next);
        });
    });
}

var altarIds = [1,2,3];
var altarNames = ["低阶祭坛","中级祭坛","高级祭坛"];
var refrigerationTimes = [2,8,24];
var extractionCosts = [1000,2000,5000];
var loyalties = [2,5,8];
var index = 0;
function insertData(data, next) {
    if(data.length == 0) {
        next({});
        return;
    }
    var rows_heroId = [];
    var rows_randomNum = [];
    var altar = {};

    var row_heroId = data.shift();
    var row_randomNum = data.shift();

    rows_heroId = row_heroId.split(",");
    rows_randomNum = row_randomNum.split(",");

    var heros = [];
    var heroRandoms = [];
    var totalRandomNum = 0;
    var startRandomNum = 1;
    var endRandomNum = 0;
    var hero = {};
    var heroRandom = {};
    for(var i = 0 ; i < rows_heroId.length ; i++) {
        hero = {};
        heroRandom = {};
        if(rows_heroId[i] == "") {
            break;
        }
        hero.cId = rows_heroId[i];
        hero.probability = rows_randomNum[i];
        heros.push(hero);

        if(i > 0)
            startRandomNum += parseInt(rows_randomNum[i - 1]);
        endRandomNum += parseInt(rows_randomNum[i]);

        heroRandom.cId = rows_heroId[i];
        heroRandom.randomNum = rows_randomNum[i];
        heroRandom.startRandomNum = startRandomNum;
        heroRandom.endRandomNum = endRandomNum;
        heroRandoms.push(heroRandom);

        totalRandomNum += parseInt(rows_randomNum[i]);
    }

    altar = {
        altarId: altarIds[index],
        altarName: altarNames[index],
        heros: JSON.stringify(heros),
        heroRandoms: JSON.stringify(heroRandoms),
        totalRandomNum: totalRandomNum,
        refrigerationTime: refrigerationTimes[index],
        extractionCost: extractionCosts[index],
        loyalty: loyalties[index]
    };
    index++;
    altarDao.insert(altar, function() {
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
AltarService.prototype.export = function(next) {
    this.getData(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].altarId;
        }
        utils.writeJSONFile(data, "altars", next);
    });
}

AltarService.prototype.exportJson = function(next) {
    this.getDatas(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].altarId;
        }
        //utils.writeJSONArrayFile(data, "altars", next);
        utils.writeJSONFile(data, "altars", next);
    });
}

module.exports = new AltarService();