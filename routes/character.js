/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-07-09
 * Description: character
 */
var heroService = require('../app/services/HeroService');
var nicknameService = require('../app/services/NicknameService');
var characterService = require('../app/services/CharacterService');

exports.index = function(req, res) {
    var heros = [];
    heroService.getAllHeros(function(data) {
        heros = data;
        console.log(heros);
        res.render('character', {
            title: 'character info',
            heros: JSON.stringify(heros)
        });
    });
}

exports.index_login = function(req, res) {
    var heros = [];
    heroService.getAllHeros(function(data) {
        heros = data;
        console.log(heros);
        res.render('character_login', {
            title: 'character info',
            heros: JSON.stringify(heros)
        });
    });
}

exports.nickname = function(req, res) {
    var nicknames = [];
    nicknameService.getAllNicknames(function(data) {
        nicknames = data;
        console.log(nicknames);
        res.render('nickname', {
            title: 'nicknames',
            nicknames: JSON.stringify(nicknames)
        });
    });
}

exports.readRedis = function(req, res) {
    var serverId = req.body.serverId;
    var registerType = req.body.registerType;
    var loginName = req.body.loginName;
    characterService.readRedis(serverId, registerType, loginName, function(data) {
        console.log(data);
        res.send(JSON.stringify(data));
    });
}

exports.writeRedis = function(req, res) {
    var serverId = req.body.serverId;
    var registerType = req.body.registerType;
    var loginName = req.body.loginName;
    var field = req.body.field;
    var value = req.body.value;
    characterService.writeRedis(serverId, registerType, loginName, field, value, function(data) {
        console.log(data);
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}

/**
 *
 * @param req
 * @param res
 */
exports.nickname_import = function(req, res) {
    var nicknames = [];
    nicknameService.import(function(data) {
        nicknames = data;
        console.log(nicknames);
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}

/**
 *
 * @param req
 * @param res
 */
exports.nickname_export = function(req, res) {
    var nicknames = [];
    nicknameService.export(function(data) {
        nicknames = data;
        console.log(nicknames);
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}

/**
 *
 * @param req
 * @param res
 */
exports.nickname_writeToRedis = function(req, res) {
    var nicknames = [];
    var serverId = 1;
    nicknameService.writeToRedis(serverId, function(err, reply) {
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}