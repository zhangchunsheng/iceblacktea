/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-06-24
 * Description: MonsterService
 */
var monsterDao = require('../dao/MonsterDao');
var fs = require('fs');
var Buffer = require('buffer').Buffer;
var constants = require('constants');
var utils = require('../utils/utils');

var MonsterService = function() {

}

MonsterService.prototype.getAllMonsters = function(next) {
    monsterDao.getAllMonsters(next);
}

MonsterService.prototype.update = function(monster, next) {
    monsterDao.update(monster, next);
}

/**
 * 导入数据
 * @param next
 */
MonsterService.prototype.import = function(next) {
    monsterDao.truncate(function(result) {
        utils.readFile("app/config/data/monsters.txt", function(data) {
            var rows = [];
            var monster = {};
            var items = [];
            for(var i = 1 ; i < data.length ; i++) {
                rows = data[i].split(",");
                if(data[i].indexOf(",") < 0) {
                    continue;
                }
                items = [];
                if(rows[18] != "")
                    items.push(rows[18]);
                if(rows[19] != "")
                    items.push(rows[19]);
                if(rows[20] != "")
                    items.push(rows[20]);
                monster = {
                    monsterId: rows[0],
                    monsterName: rows[2],
                    level: rows[3],
                    resourcePath: rows[4],
                    monsterType: rows[5],
                    attackType: rows[6],
                    hp: rows[7],
                    attack: rows[8],
                    defense: rows[9],
                    speed: rows[10],
                    focus: rows[11],
                    dodge: rows[12],
                    counter: rows[13],
                    block: rows[14],
                    criticalHit: rows[15],
                    critDamage: 1.6,
                    skillId: "",
                    experience: rows[16],
                    money: rows[17],
                    items: JSON.stringify(items)
                };
                monsterDao.insert(monster);
            }
            next({});
        });
    });
}

/**
 * 导出数据
 * @param next
 */
MonsterService.prototype.export = function(next) {
    this.getAllMonsters(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].monsterId;
        }
        utils.writeJSONFile(data, "monster", next);
    });
}

MonsterService.prototype.exportJson = function(next) {
    this.getAllMonsters(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].monsterId;
        }
        utils.writeJSONArrayFile(data, "monster", next);
    });
}

module.exports = new MonsterService();