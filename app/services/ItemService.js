/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-08-03
 * Description: itemService
 */
var itemDao = require('../dao/ItemDao');
var utils = require('../utils/utils');

var ItemService = function() {

}

ItemService.prototype.getData = function(next) {
    itemDao.getData(next);
}

ItemService.prototype.update = function(item, next) {
    item.equipmentName = item.name;
    delete item.name;
    itemDao.update(item, next);
}

/**
 * 导入数据
 * @param next
 */
ItemService.prototype.import = function(next) {
    itemDao.truncate(function(result) {
        utils.readFile("app/config/data/items.txt", function(data) {
            data.shift();
            insertData(data, next);
            next({});
        });
    });
}

function insertData(data, next) {
    if(data.length == 0) {
        next({});
        return;
    }
    var row = data.shift();
    var rows = row.split(",");
    var item = {};
    if(row.indexOf(",") < 0) {
        insertData(data, next);
    }
    var itemId = rows[0];
    var canUse = itemId.substr(1, 2);
    var itemType = itemId.substr(3, 2);
    var categoryId = itemId.substr(5, 2);
    /*item = {
        itemId: itemId,
        canUse: canUse,
        itemType: itemType,
        categoryId: categoryId,
        name: rows[1],
        description: rows[2],
        effectDescription: rows[3],
        explain: rows[4],
        resId: rows[5] == "" ? 0 : rows[5],
        price: rows[6] == "" ? 0 : rows[6],
        quality: rows[7] == "" ? 0 : rows[7],
        needLevel: rows[8],
        pileNum: rows[9],
        isBinding: rows[10] == "" ? 0 : rows[10],
        canWarehouse: rows[11],
        canSell: rows[12] == "" ? 0 : rows[12],
        canDrop: rows[13] == "" ? 0 : rows[13],
        destroyTime: rows[14] == "" ? 0 : rows[14],
        level: rows[15] == "" ? 1 : rows[15],
        useEffectId: rows[16] == "" ? 0 : rows[16],
        useTip: "",
        compose: ""
    };*/
    item = {
        itemId: itemId,
        canUse: canUse,
        itemType: itemType,
        categoryId: categoryId,
        name: rows[1],
        description: rows[2],
        //effectDescription: rows[3],
        //explain: rows[4],
        icon: rows[3] == "" ? 0 : rows[3],
        price: rows[4] == "" ? 0 : rows[4],
        quality: rows[5] == "" ? 0 : rows[5],
        needLevel: rows[6],
        pileNum: rows[7],
        isBinding: rows[8] == "" ? 0 : rows[8],
        canWarehouse: rows[9],
        canSell: rows[10] == "" ? 0 : rows[10],
        canDrop: rows[11] == "" ? 0 : rows[11],
        destroyTime: rows[12] == "" ? 0 : rows[12],
        level: rows[13] == "" ? 1 : rows[13],
        useEffectId: rows[14] == "" ? 0 : rows[14],
        useTip: "",
        compose: ""
    };
    itemDao.insert(item, function() {
        insertData(data, next);
    });
}

/**
 * 导出数据
 * @param next
 */
ItemService.prototype.export = function(next) {
    this.getData(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].itemId;
        }
        utils.writeJSONFile(data, "item", next);
    });
}

ItemService.prototype.exportJson = function(next) {
    this.getData(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].itemId;
        }
        utils.writeJSONArrayFile(data, "item", next);
    });
}

module.exports = new ItemService();