/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2014-01-13
 * Description: shopService
 */
var shopDao = require('../../dao/shop/ShopDao');
var utils = require('../../utils/utils');

var ShopService = function() {

}

ShopService.prototype.getData = function(next) {
    shopDao.getData(next);
}

ShopService.prototype.update = function(shop, next) {
    shop.shopName = shop.name;
    delete shop.name;
    shopDao.update(shop, next);
}

/**
 * 导入数据
 * @param next
 */
ShopService.prototype.import = function(next) {
    shopDao.truncate(function(result) {
        utils.readFile("app/config/data/shop.txt", function(data) {
            data.shift();
            insertData(data, next);
        });
    });
}

function insertData(data, next) {
    if(data.length == 0) {
        next({});
        return;
    }
    var rows = [];
    var shop = {};

    var row = data.shift();

    rows = row.split(",");
    if(row.indexOf(",") < 0) {
        insertData(data, next);
    }

    var shopData = [];
    for(var i = 1 ; i <= 10 ; i++) {
        shopData.push(rows[i]);
    }
    shop = {
        shopId: rows[0],
        npcId: rows[0],
        shopName: "",
        shopData: JSON.stringify(shopData)
    };
    shopDao.insert(shop, function() {
        insertData(data, next);
    });
}

/**
 * 导出数据
 * @param next
 */
ShopService.prototype.export = function(next) {
    this.getData(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].shopId;
        }
        utils.writeJSONFile(data, "shops", next);
    });
}

ShopService.prototype.exportJson = function(next) {
    this.getData(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].shopId;
        }
        utils.writeJSONArrayFile(data, "shops", next);
    });
}

module.exports = new ShopService();