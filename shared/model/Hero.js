/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-06-25
 * Description: Hero
 */
var Hero = function() {
    this.xpNeeded = 0;
    this.accumulated_xp = 0;
    this.hp = 0;
    this.attack = 0;
    this.defense = 0;
    this.focus = 0;
    this.speedLevel = 0;
    this.speed = 0;
    this.dodge = 0;
    this.criticalHit = 0;
    this.critDamage = 0;
    this.block = 0;
    this.counter = 0;
}

module.exports = Hero;