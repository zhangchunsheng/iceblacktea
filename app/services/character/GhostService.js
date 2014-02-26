/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-12-09
 * Description: ghostService
 */
var ghostDao = require('../../dao/character/GhostDao');
var utils = require('../../utils/utils');

var GhostService = function() {

}

GhostService.prototype.getData = function(next) {
    ghostDao.getData(next);
}

GhostService.prototype.getAllData = function(next) {
    ghostDao.getAllData(next);
}

GhostService.prototype.update = function(ghost, next) {
    ghostDao.update(ghost, next);
}

/**
 * 导入数据
 * @param next
 */
GhostService.prototype.import = function(next) {
    ghostDao.truncate(function(result) {
        utils.readFile("app/config/data/ghosts.txt", function(data) {
            data.shift();
            insertData(data, next);
        });
    });
}

var heroId;
var page;
var color;
var keys = "";
var values = "";
var sql = "";
function insertData(data, next) {
    if(data.length == 0) {
        utils.writeLine("ghost", sql, function() {
            next({});
        });
        return;
    }
    var rows = [];
    var ghost = {};

    var row = data.shift();

    rows = row.split(",");
    if(row.indexOf(",") < 0) {
        insertData(data, next);
    }

    if(rows[0] != "")
        heroId = rows[0];
    if(rows[1] != "")
        page = rows[1]
    var colorIndex = 1;
    if(rows[2] != "")
        color = rows[colorIndex + 1];
    //color = "";
    ghost = {
        heroId: heroId,
        page: page,
        color: color,
        pointId: rows[colorIndex + 2] == "" ? 0 : rows[colorIndex + 2],
        attrId: rows[colorIndex + 3],
        attrValue: rows[colorIndex + 4],
        costGhostNum: rows[colorIndex + 5] == "" ? 1 : rows[colorIndex + 5],
        probability: rows[colorIndex + 6],
        pointX: rows[colorIndex + 7],
        pointY: rows[colorIndex + 8] == "" ? 0 : rows[colorIndex + 8]
    };
    keys = "";
    values = "";
    for(var i in ghost) {
        keys += i + ",";
        values += "'" + ghost[i] + "',";
    }
    keys = keys.substr(0, keys.length - 1);
    values = values.substr(0, values.length - 1);
    sql += "insert seaking_ghost(" + keys + ") values (" + values + ");\n";
    insertData(data, next);
    /*ghostDao.insert(ghost, function() {
        insertData(data, next);
    });*/
}

/**
 * 导出数据
 * @param next
 */
GhostService.prototype.export = function(next) {
    this.getAllData(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            delete data[i].id;
            data[i].id = data[i].heroId;
        }
        utils.writeJSONFile(data, "ghosts", next);
        //utils.writeJSONWithIdFile(data, "ghosts", next);
    });
}

GhostService.prototype.exportJson = function(next) {
    this.getAllData(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            delete data[i].id;
            data[i].id = data[i].heroId;
        }
        //utils.writeJSONArrayFile(data, "ghosts", next);
        utils.writeJSONWithIdFile(data, "ghosts", next);
    });
}

module.exports = new GhostService();