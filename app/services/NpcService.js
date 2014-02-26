/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-07-17
 * Description: npcService
 */
var npcDao = require('../dao/NpcDao');
var utils = require('../utils/utils');

var NpcService = function() {

}

NpcService.prototype.getData = function(next) {
    npcDao.getData(next);
}

NpcService.prototype.update = function(npc, next) {
    npc.npcName = npc.name;
    delete npc.name;
    npcDao.update(npc, next);
}

/**
 * 导入数据
 * @param next
 */
NpcService.prototype.import = function(next) {
    npcDao.truncate(function(result) {
        utils.readFile("app/config/data/npc.txt", function(data) {
            var rows = [];
            var npc = {};
            for(var i = 1 ; i < data.length ; i++) {
                rows = data[i].split(",");
                if(data[i].indexOf(",") < 0) {
                    continue;
                }
                npc = {
                    npcId: rows[0],
                    npcName: rows[1],
                    bustPosition: rows[2] == "" ? 0 : rows[2],
                    isShow: rows[3] == "" ? 0 : rows[3],
                    position: rows[5] == "" ? 0 : rows[5],
                    ans: rows[6] == "" ? 0 : rows[6],
                    bust: rows[7] == "" ? 0 : rows[7]
                };
                npcDao.insert(npc);
            }
            next({});
        });
    });
}

/**
 * 导出数据
 * @param next
 */
NpcService.prototype.export = function(next) {
    this.getData(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].npcId;
        }
        utils.writeJSONFile(data, "npc", next);
    });
}

module.exports = new NpcService();