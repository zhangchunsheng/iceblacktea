/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-06-24
 * Description: HeroService
 */
var heroDao = require('../dao/HeroDao')
    , fs = require('fs')
    , path = require('path')
    , utils = require('../utils/utils');

var HeroService = function() {

}

HeroService.prototype.getAllHeros = function(next) {
    heroDao.getAllHeros(next);
}

HeroService.prototype.update = function(hero, next) {
    heroDao.update(hero, next);
}

HeroService.prototype.export = function(next) {
    this.getAllHeros(function(data) {
        utils.writeJSONFile(data, "heros", next);
    });
}

module.exports = new HeroService();