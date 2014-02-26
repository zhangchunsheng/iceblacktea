/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-06-24
 * Description: hero
 */
var selectHeroId;
$(document).ready(function() {
    $("div .hero").click(function() {
        $("#selectHero").val( $(this).children().text());
        selectHeroId = $(this).children().attr("id");
        var hero = utils.getItem(heros, selectHeroId);
        var template = $("#heroTemplate").html();
        $("#hero").html(_.template(template, {hero:hero}));
        $("select[name='herotype']").selectpicker({style: 'btn-primary', menuStyle: 'dropdown-inverse'});
        $("#saveAttr").on("click", function() {
            var hero = {
                id: selectHeroId,
                type: $("#herotype").val(),
                photo: $("#photo").val(),
                xpNeeded: $("#xpNeeded").val(),
                levelFillRate: $("#levelFillRate").val(),
                hp: $("#hp").val(),
                hpFillRate: $("#hpFillRate").val(),
                attack: $("#attack").val(),
                attLevelUpRate: $("#attLevelUpRate").val(),
                defense: $("#defense").val(),
                defLevelUpRate: $("#defLevelUpRate").val(),
                focus: $("#focus").val(),
                focusMaxIncrement: $("#focusMaxIncrement").val(),
                speedLevel: $("#speedLevel").val(),
                speed: $("#speed").val(),
                speedMaxIncrement: $("#speedMaxIncrement").val(),
                dodge: $("#dodge").val(),
                dodgeMaxIncrement: $("#dodgeMaxIncrement").val(),
                criticalHit: $("#criticalHit").val(),
                critHitMaxIncrement: $("#critHitMaxIncrement").val(),
                critDamage: $("#critDamage").val(),
                critDamageMaxIncrement: $("#critDamageMaxIncrement").val(),
                block: $("#block").val(),
                blockMaxIncrement: $("#blockMaxIncrement").val(),
                counter: $("#counter").val(),
                counterMaxIncrement: $("#counterMaxIncrement").val()
            }
            hero = JSON.stringify(hero);
            console.log(hero);
            var that = this;
            $.ajax({
                type: "post",
                url: 'hero/' + selectHeroId,
                data: {hero: hero},
                success: function(data, status) {
                    var data = JSON.parse(data);
                    if(data.result == 1) {
                        utils.alert(that, "保存成功！");
                    } else {
                        utils.alert(that, "保存失败！");
                    }
                }
            });
            return false;
        });
        return false;
    });

    $("#calculate").click(function() {
        if(typeof selectHeroId == "undefined" || selectHeroId == "") {
            utils.alert(this, "请选择英雄");
            return false;
        }
        var hero = utils.getItem(heros, selectHeroId);
        var newHero = new Hero();
        var level = parseInt($("#herolevel").val());
        console.log(hero);
        newHero.xpNeeded = formula.calculateXpNeeded(hero.xpNeeded, hero.levelFillRate, level);
        newHero.accumulated_xp = formula.calculateAccumulated_xp(hero.xpNeeded, hero.levelFillRate, level);
        newHero.hp = formula.calculateHp(parseInt(hero.hp), parseInt(hero.hpFillRate), level);
        newHero.attack = formula.calculateAttack(parseInt(hero.attack), parseInt(hero.attLevelUpRate), level);
        newHero.defense = formula.calculateDefense(parseInt(hero.defense), parseInt(hero.defLevelUpRate), level);
        newHero.focus = formula.calculateFocus(parseInt(hero.focus), parseInt(hero.focusMaxIncrement), level);
        newHero.speedLevel = formula.calculateSpeedLevel(parseInt(hero.speedLevel), parseInt(hero.speedMaxIncrement), level);
        newHero.speed = formula.calculateSpeed(parseInt(hero.speedLevel), parseInt(hero.speedMaxIncrement), level);
        newHero.dodge = formula.calculateDodge(parseInt(hero.dodge), parseInt(hero.dodgeMaxIncrement), level);
        newHero.criticalHit = formula.calculateCriticalHit(parseInt(hero.criticalHit), parseInt(hero.critHitMaxIncrement), level);
        newHero.critDamage = formula.calculateCritDamage(parseInt(hero.critDamage), parseInt(hero.critDamageMaxIncrement), level);
        newHero.block = formula.calculateBlock(parseInt(hero.block), parseInt(hero.blockMaxIncrement), level);
        newHero.counter = formula.calculateCounter(parseInt(hero.counter), parseInt(hero.counterMaxIncrement), level);
        var template = $("#newHeroTemplate").html();
        $("#attributes").html(_.template(template, {hero:newHero}));
        return false;
    });

    $("#export").click(function() {
        var that = this;
        $.ajax({
            type: "post",
            url: 'heros/export',
            success: function(data, status) {
                var data = JSON.parse(data);
                if(data.result == 1) {
                    utils.alert(that, "导出成功！");
                } else {
                    utils.alert(that, "导出失败！");
                }
            }
        });
        return false;
    });

    $("#exportJson").click(function() {
        var that = this;
        $.ajax({
            type: "post",
            url: 'heros/exportJson',
            success: function(data, status) {
                var data = JSON.parse(data);
                if(data.result == 1) {
                    utils.alert(that, "导出成功！");
                } else {
                    utils.alert(that, "导出失败！");
                }
            }
        });
        return false;
    });
});