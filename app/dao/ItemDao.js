/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-08-03
 * Description: itemDao
 */
var mysql = require('./mysql/mysql');
var mysqlUtil = require('../utils/mysqlUtil');
var BaseDao = require('./BaseDao');
var util = require('util');

var ItemDao = function() {
    var opts = {
        columns: "id,itemId,`name`,description,icon,effectDescription,`explain`,itemType,price,quality,pileNum,categoryId,useEffectId,isBinding,canWarehouse,canDestroy,destroyTime,`level`,canSell,canDrop,canUse,needLevel,compose,useTip,needMaterial",
        tableName: "seaking_items"
    }
    BaseDao.call(this, opts);
}

util.inherits(ItemDao, BaseDao);

module.exports = new ItemDao();