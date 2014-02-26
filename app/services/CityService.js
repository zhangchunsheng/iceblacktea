/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-07-17
 * Description: cityService
 */
var cityDao = require('../dao/CityDao');
var utils = require('../utils/utils');

var CityService = function() {

}

CityService.prototype.getData = function(next) {
    cityDao.getData(next);
}

CityService.prototype.update = function(city, next) {
    city.cityName = city.name;
    delete city.name;
    cityDao.update(city, next);
}

/**
 * 导入数据
 * @param next
 */
CityService.prototype.import = function(next) {
    cityDao.truncate(function(result) {
        utils.readFile("app/config/data/city.txt", function(data) {
            var rows = [];
            var npcs = [];
            var city = {};
            for(var i = 1 ; i < data.length ; i++) {
                rows = data[i].split(",");
                if(data[i].indexOf(",") < 0) {
                    continue;
                }
                npcs = getNpcs(rows);
                city = {
                    cityId: rows[0],
                    cityName: rows[1],
                    description: rows[2] == "" ? "" : rows[2],
                    npcs: JSON.stringify(npcs)
                };
                cityDao.insert(city);
            }
            next({});
        });
    });
}

function getNpcs(rows) {
    var npcs = [];
    for(var i = 3 ; i < rows.length ; i++) {
        if(rows[i] != "") {
            npcs.push({
                npcId: rows[i]
            });
        }
    }
    return npcs;
}

/**
 * 导出数据
 * @param next
 */
CityService.prototype.export = function(next) {
    this.getData(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].cityId;
        }
        utils.writeJSONFile(data, "city", next);
    });
}

module.exports = new CityService();