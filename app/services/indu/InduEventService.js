/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-07-17
 * Description: induEventService
 */
var induEventDao = require('../../dao/indu/InduEventDao');
var utils = require('../../utils/utils');

var InduEventService = function() {

}

InduEventService.prototype.getData = function(next) {
    induEventDao.getData(next);
}

InduEventService.prototype.update = function(event, next) {
    induEventDao.update(event, next);
}

/**
 * 导入数据
 * @param next
 */
InduEventService.prototype.import = function(next) {
    console.log("import");
    induEventDao.truncate(function(result) {
        utils.readFile("app/config/data/induEvents.txt", function(data) {
            console.log(data);
            var rows = [];
            var event = {};
            var eventData = {};
            var _data = {};
            for(var i = 1 ; i < data.length ; i++) {
                eventData = {};
                rows = data[i].split(",");
                if(data[i].indexOf(",") < 0) {
                    continue;
                }
                if(rows[1] == 1) {
                    if(rows[2].indexOf("M") >= 0) {
                        _data = rows[2].split("|");
                        eventData.money = _data[1];
                    } else if(rows[2].indexOf("E") >= 0) {
                        _data = rows[2].split("|");
                        eventData.experience = _data[1];
                    } else {
                        _data = rows[2].split("|");
                        eventData.item = [];
                        eventData.item.push({
                            itemId: _data[0],
                            itemNum: _data[1]
                        });
                    }
                } else if(rows[1] == 2) {
                    eventData.id = rows[2];
                } else if(rows[1] == 3) {
                    eventData.sceneId = rows[2];
                } else if(rows[1] == 4) {
                    _data = rows[2].split("|");
                    eventData.pos = {
                        x: _data[0],
                        y: _data[1]
                    };
                }
                event = {
                    eventId: rows[0],
                    eventType: rows[1] == "" ? 0 : rows[1],
                    eventData: JSON.stringify(eventData)
                };
                console.log(event);
                induEventDao.insert(event);
            }
            next({});
        });
    });
}

/**
 * 导出数据
 * @param next
 */
InduEventService.prototype.export = function(next) {
    this.getData(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].eventId;
        }
        utils.writeJSONFile(data, "indu_event", next);
    });
}

InduEventService.prototype.exportJson = function(next) {
    this.getData(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].eventId;
        }
        utils.writeJSONArrayFile(data, "indu_event", next);
    });
}

module.exports = new InduEventService();