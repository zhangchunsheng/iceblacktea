/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-07-11
 * Description: InduMonstergroupService
 */
var induMonstergroupDao = require('../../dao/indu/InduMonstergroupDao');
var utils = require('../../utils/utils');

var InduMonstergroupService = function() {
    this.formations = null;
}

InduMonstergroupService.prototype.getAllMonstergroups = function(next) {
    induMonstergroupDao.getAllMonstergroups(next);
}

InduMonstergroupService.prototype.update = function(monstergroup, next) {
    induMonstergroupDao.update(monstergroup, next);
}

InduMonstergroupService.prototype.getFirstMonsterId = function(mgid, next) {
    induMonstergroupDao.getAllFormations(function(data) {
        for(var i = 0 ; i < data[mgid].formation.length ; i++) {
            if(data[mgid].formation[i] != 0) {
                next(data[mgid].formation[i]);
                break;
            }
        }
        next(0);
    });
}

/**
 * 导入数据
 * @param next
 */
InduMonstergroupService.prototype.import = function(next) {
    induMonstergroupDao.truncate(function(result) {
        utils.readFile("app/config/data/monstergroup.txt", function(data) {
            var rows = [];
            var monstergroup = {};
            for(var i = 1 ; i < data.length ; i++) {
                rows = data[i].split(",");
                if(data[i].indexOf(",") < 0) {
                    continue;
                }
                monstergroup = {
                    mgid: rows[0],
                    showName: rows[1],
                    formation: JSON.stringify([getMonsterId(rows[2]),getMonsterId(rows[3]),getMonsterId(rows[4]),getMonsterId(rows[5]),getMonsterId(rows[6]),getMonsterId(rows[7]),getMonsterId(rows[8])])
                };
                console.log(monstergroup);
                induMonstergroupDao.insert(monstergroup);
            }
            next({});
        });
    });
}

/**
 * 导出数据
 * @param next
 */
InduMonstergroupService.prototype.export = function(next) {
    this.getAllMonstergroups(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].mgid;
        }
        utils.writeJSONFile(data, "induMonstergroup", next);
    });
}

InduMonstergroupService.prototype.exportJson = function(next) {
    this.getAllMonstergroups(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].mgid;
        }
        utils.writeJSONArrayFile(data, "induMonstergroup", next);
    });
}

function getMonsterId(id) {
    if(id == null || id == "")
        id = 0;
    return id;
}

module.exports = new InduMonstergroupService();