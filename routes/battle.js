/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-06-25
 * Description: battle
 */
var heroService = require('../app/services/HeroService');
var heroV2Service = require('../app/services/v2/HeroV2Service');
var skillV2Service = require('../app/services/v2/SkillV2Service');
var async = require('async');

exports.index = exports.battle = function(req, res) {
    var heros = [];
    heroService.getAllHeros(function(data) {
        heros = data;
        console.log(heros);
        res.render('battle', {
            title: 'battle imitate',
            heros: JSON.stringify(heros)
        });
    });
}

exports.battle2 = function(req, res) {
    var heros = [];
    var skills = [];
    async.parallel([
        function(callback) {
            heroV2Service.getAllHeros(function(err, data) {
                callback(err, data);
            });
        },
        function(callback) {
            skillV2Service.getAllSkills(function(err, data) {
                callback(err, data);
            });
        }
    ], function(err, results) {
        heros = results[0];
        skills = results[1];
        console.log(results);
        res.render('battle/battle2', {
            title: '战斗模拟',
            heros: JSON.stringify(heros),
            skills: JSON.stringify(skills)
        });
    });
}