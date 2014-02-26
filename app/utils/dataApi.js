/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-08-21
 * Description: dataApi
 */
var menus = require('../config/menus');

var Data = function(data) {
    this.data = data;
}

Data.prototype.getArray = function() {
    var array = [];
    for(var i = 0 ; i < this.data.length ; i++) {
        array.push({
            id: this.data[i].id,
            name: this.data[i].name,
            href: this.data[i].href
        });
    }
    return array;
}

Data.prototype.findById = function(id) {
    var obj;
    for(var i = 0 ; i < this.data.length ; i++) {
        if(this.data[i].id == id) {
            obj = this.data[i];
        }
    }
    return obj;
}

module.exports = {
    menus: new Data(menus.menus)
}