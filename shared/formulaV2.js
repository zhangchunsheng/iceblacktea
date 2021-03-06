/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-11-13
 * Description: formulaV2
 */
var formula = module.exports;
var dataApi = require('../utils/dataApi');

formula.calDamage = function(attacker, target) {

}

/**
 * format time
 * @param date
 * @returns {string}
 */
formula.timeFormat = function(date) {
    var n = date.getFullYear();
    var y = date.getMonth() + 1;
    var r = date.getDate();
    var mytime = date.toLocaleTimeString();
    var mytimes = n + "-" + y + "-" + r + " " + mytime;
    return mytimes;
}

/**
 * get timestamp
 * @param date
 * @returns {*}
 */
formula.timestamp = function(date) {
    var time = date.getTime();
    return time;
}

formula.calculateAddUp = function(value, rate, level) {
    var number = value;
    /*for(var i = 0 ; i < level ; i++) {
     number += rate * (i + 1);
     }*/
    number += level * (rate + rate * level) / 2;
    return Math.floor(number);
}

formula.calculateValue = function(value, rate, level) {
    var number = value + rate * level;
    return number;
}

formula.calculateXpNeeded = function(value, rate, level) {
    var xpNeeded = value - rate;
    /*for(var i = 0 ; i < level ; i++) {
     xpNeeded += rate * (i + 1);
     }*/
    xpNeeded += level * (rate + rate * level) / 2;
    return Math.floor(xpNeeded);
}

formula.calculateAccumulated_xp = function(value, rate, level) {
    var xpNeeded = value - rate;
    var accumulated_xp = 0;
    for(var i = 0 ; i < level ; i++) {
        xpNeeded += rate * (i + 1);
        accumulated_xp += xpNeeded;
    }

    return Math.floor(accumulated_xp);
}

/**
 * 	伤害 = (100 + 破甲) * 攻击力 /（100 + 护甲）
 * 	生命 = 基础生命 + 等级 * 成长系数
 * 	攻击 = 基础攻击 + 等级 * 成长系数
 * 	速度 = 基础速度 * （1 + 等级 * 0.01）
 * 	护甲 = 基础护甲 * （1+0.5 * 等级）
 * 	破甲 = 基础破甲 * （1+0.5 * 等级）
 * 	暴击 = 基础暴击 * （1+等级 * 0.1）
 * 	格挡 = 基础格挡 * （1+等级 * 0.1）
 * 	闪避 = 基础闪避 * （1+等级 * 0.1）
 * 	反击 = 基础反击 * （1+等级 * 0.1）
 * @param hp
 * @param addHp
 * @param level
 * @returns {number}
 */
formula.calculateHp = function(hp, addHp, level) {
    return hp + level * addHp;
}

formula.calculateAttack = function(attack, addAttack, level) {
    return attack + level * addAttack;
}

/**
 * 计算护甲
 * @param defense
 * @param level
 * @returns {number}
 */
formula.calculateDefense = function(defense, level) {
    return defense * (1 + level * 0.5);
}

formula.calculateFocus = function(value, rate, level) {
    rate = rate / 40;
    return this.calculateValue(value, rate, level);
}

/**
 * 计算破甲
 */
formula.calculateSunderArmor = function(value, level) {
    return value * (1 + level * 0.5);
}

formula.calculateSpeedLevel = function(speed, level) {
    return speed * (1 + level * 0.01);
}

formula.calculateSpeed = function(value, level) {
    var number = this.calculateSpeedLevel(value, level);
    return 100 / number;
}

formula.calculateDodge = function(value, level) {
    return value * (1 + level * 0.1);
}

formula.calculateCriticalHit = function(value, level) {
    return value * (1 + level * 0.1);
}

formula.calculateCritDamage = function(value, level) {
    return value * 1.6;
}

formula.calculateBlock = function(value, level) {
    return value * (1 + level * 0.1);
}

formula.calculateCounter = function(value, level) {
    return value * (1 + level * 0.1);
}