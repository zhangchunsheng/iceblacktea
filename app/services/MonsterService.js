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
            for(var i = 1 ; i < data.length ; i++) {
                rows = data[i].split(",");
                if(data[i].indexOf(",") < 0) {
                    continue;
                }
                monster = {
                    monsterId: rows[0],
                    monsterName: rows[1],
                    level: rows[2],
                    resourcePath: rows[3],
                    attackType: rows[4],
                    hp: rows[5],
                    attack: rows[6],
                    defense: rows[7],
                    speed: rows[8],
                    focus: rows[9],
                    dodge: rows[10],
                    counter: rows[11],
                    block: rows[12],
                    criticalHit: rows[13],
                    critDamage: rows[14],
                    skillId: rows[15],
                    experience: rows[16],
                    money: rows[17],
                    items: rows[18]
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