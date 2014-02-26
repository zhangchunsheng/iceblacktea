/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-07-11
 * Description: InstancedungeonService
 */
var instanceDungeonDao = require('../../dao/indu/InstancedungeonDao');
var induMonstergroupDao = require('../../dao/indu/InduMonstergroupDao');
var utils = require('../../utils/utils');

var InstancedungeonService = function() {

}

InstancedungeonService.prototype.getAllInstancedungeons = function(next) {
    instanceDungeonDao.getAllInstancedungeons(next);
}

InstancedungeonService.prototype.update = function(monstergroup, next) {
    instanceDungeonDao.update(monstergroup, next);
}

/**
 * 导入数据
 * @param next
 */
InstancedungeonService.prototype.import = function(next) {
    instanceDungeonDao.truncate(function(result) {
        utils.readFile("app/config/data/instancedungeon.txt", function(data) {
            var rows = [];
            var instancedungeon = {};
            var induData = {};

            /**
             * 第一位副本类型
             * 1 - 任务副本
             * 2 - boss副本
             * 3 - 世界副本
             * 4 - 神秘副本
             * 5 - 材料副本
             * 第二三两位代表所属城市
             * 第四五两位代表序号
             */
            var induId = 0;
            var type = 0;
            var cityId = 0;
            var maxIndex = 10;
            var start = 8;
            var induData = [];//[{"mgid":1,"eventId":1,"showMonsterId":1}] rows[8]
            var obj = {};

            induMonstergroupDao.getAllFormations(function(formations) {
                console.log(formations);
                for(var i = 1 ; i < data.length ; i++) {
                    rows = data[i].split(",");
                    if(data[i].indexOf(",") < 0) {
                        continue;
                    }

                    induId = rows[0];
                    type = induId.replace("Ins", "").substr(0, 1);
                    cityId = induId.replace("Ins", "").substr(1, 2);
                    maxIndex = 15;
                    start = 8;
                    induData = [];//[{"mgid":1,"eventId":1,"showMonsterId":1}] rows[8]
                    obj = {};

                    /*for(var j = 0 ; j < maxIndex ; j++) {
                        obj = {};
                        if(rows[start + j * 2] == "") {
                            obj = null;
                        } else {
                            obj.mgid = rows[start + j * 2];
                            obj.eventId = rows[start + j * 2 + 1];
                            console.log(obj.mgid);
                            console.log(formations[obj.mgid]);
                            if(typeof formations[obj.mgid] != "undefined") {
                                for(var k = 0 ; k < formations[obj.mgid].length ; k++) {
                                    if(formations[obj.mgid][k] != 0) {
                                        obj.showMonsterId = formations[obj.mgid][k];
                                        break;
                                    }
                                }
                            } else {
                                obj.showMonsterId = 0;
                            }
                        }
                        induData.push(obj);
                    }*/
                    for(var j = 0 ; j < maxIndex ; j++) {
                        obj = {};
                        if(rows[start + j] == "") {
                            obj = null;
                        } else {
                            obj.eventId = rows[start + j];
                            if(obj.eventId.indexOf("MG") >= 0) {
                                obj.mgid = rows[start + j];
                                if(typeof formations[obj.mgid] != "undefined") {
                                    for(var k = 0 ; k < formations[obj.mgid].length ; k++) {
                                        if(formations[obj.mgid][k] != 0) {
                                            obj.showMonsterId = formations[obj.mgid][k];
                                            break;
                                        }
                                    }
                                } else {
                                    obj.showMonsterId = 0;
                                }
                            }
                        }
                        induData.push(obj);
                    }
                    instancedungeon = {
                        induId: induId,
                        name: rows[1],
                        cityId: cityId,
                        type: type,
                        maxIndex: maxIndex,
                        enterCondition: rows[2],
                        enterConditionValue: rows[3],
                        resourcePath: rows[4],
                        getExp: rows[5],
                        getMoney: rows[6],
                        getItems: rows[7],
                        induData: JSON.stringify(induData)
                    };

                    instanceDungeonDao.insert(instancedungeon);
                }
            });
            next({});
        });
    });
}

/**
 * 导出数据
 * @param next
 */
InstancedungeonService.prototype.export = function(next) {
    this.getAllInstancedungeons(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].induId;
        }
        utils.writeJSONFile(data, "instancedungeon", next);
    });
}

InstancedungeonService.prototype.exportJson = function(next) {
    this.getAllInstancedungeons(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].induId;
        }
        utils.writeJSONArrayFile(data, "instancedungeon", next);
    });
}

module.exports = new InstancedungeonService();