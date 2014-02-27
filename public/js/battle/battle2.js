/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-11-13
 * Description: battle2
 */
$(document).ready(function() {
    $("#fighting").hide();
    $("div .hero").click(function() {

    });

    $("#owner_addHero").click(function() {
        var template = $("#chooseTemplate").html();
        $("#ownerTeam").append(_.template(template, {heros:heros}));
        selectpicker();
    });

    $("#opponent_addHero").click(function() {
        var template = $("#chooseTemplate").html();
        $("#opponentTeam").append(_.template(template, {heros:heros}));
        selectpicker();
    });

    $("#battle").click(function() {
        //check owner_team
        var owner_team = $("#ownerTeam").children("div");
        if(!checkTeam(owner_team)) {
            alert("请检查己方英雄");
            return;
        }
        //check opponent_team
        var opponent_team = $("#opponentTeam").children("div");
        if(!checkTeam(opponent_team)) {
            alert("请检查敌方英雄");
            return;
        }

        var owner_heros = [];
        var opponent_heros = [];
        for(var i = 0 ; i < owner_team.length ; i++) {
            owner_heros.push(getHero(owner_team[i]));
        }
        for(var i = 0 ; i < opponent_team.length ; i++) {
            opponent_heros.push(getHero(opponent_team[i]));
        }

        if(!checkHeros(owner_heros)) {
            alert("请检查己方英雄");
            return;
        }
        if(!checkHeros(opponent_heros)) {
            alert("请检查敌方英雄");
            return;
        }

        var url = "http://192.168.1.99:4011/battle/battle2";
        var url = "http://192.168.6.99:4011/battle/battle2";
        var data = {
            owner_heros: JSON.stringify(owner_heros),
            opponent_heros: JSON.stringify(opponent_heros)
        };

        $("#fighting").show();

        $("#battle_center").html("战斗结果<br/>");
        $("#owner_winnum").html(0);
        $("#opponent_winnum").html(0);
        $("#win_probability").html(0);

        var params = "";
        for(var o in data) {
            params += o + "=" + data[o] + "&"
        }
        params = params.substr(0, params.length - 1);
        console.log(params);
        var battleNum = parseInt($("#battleNum").val());
        if(battleNum < 0) {
            battleNum = 10;
            $("#battleNum").val(10);
        }
        owner_winnum = 0;
        opponent_winnum = 0;
        allNum = battleNum;
        countNum = 0;
        testBattle(url, params, battleNum);
    });
});

var owner_winnum = 0;
var opponent_winnum = 0;
var allNum = 0;
var countNum = 0;
function testBattle(url, params, battleNum) {
    $.ajax({
        type: "get",
        dataType: "jsonp",
        jsonp: "jsoncallback",
        url: url + "?" + params,
        success: function(data, status) {
            console.log(data);
            $("#fighting").hide();
            $("#battle_center").append(addContent(data));
            if(data.battleResult.isWin) {
                owner_winnum++;
                $("#owner_winnum").html(owner_winnum);
            } else {
                opponent_winnum++;
                $("#opponent_winnum").html(opponent_winnum);
            }
            battleNum--;
            if(battleNum > 0) {
                testBattle(url, params, battleNum);
            } else {
                $("#win_probability").html(owner_winnum / allNum);
            }
        }
    });
}

/**
 * {"formationData":{"owner":[{"heroId":"1","level":"1"},null,null,null,null,null,null],"monster":[{"heroId":"1","level":"1"},null,null,null,null,null,null]},"battleData":[{"target":[{"id":"1","fId":0,"action":1,"hp":156,"anger":3}],"attackSide":1,"currentTime":1,"targetType":2,"delayTime":1,"sequence":["1","1"],"camp":"player","attacker":"1","attackerFid":0,"attackType":1,"damageType":1,"attackAnger":10},{"target":[{"id":"1","fId":0,"action":1,"hp":156,"anger":13}],"attackSide":2,"currentTime":1,"targetType":2,"delayTime":0,"sequence":["1","1"],"camp":"enemy","attacker":"1","attackerFid":0,"attackType":1,"damageType":1,"attackAnger":10},{"target":[{"id":"1","fId":0,"action":1,"hp":90,"anger":13}],"attackSide":1,"currentTime":2.424,"targetType":2,"delayTime":1.424,"sequence":["1","1"],"camp":"player","attacker":"1","attackerFid":0,"attackType":1,"damageType":1,"attackAnger":10},{"target":[{"id":"1","fId":0,"action":1,"hp":90,"anger":13}],"attackSide":2,"currentTime":2.424,"targetType":2,"delayTime":0,"sequence":["1","1"],"camp":"enemy","attacker":"1","attackerFid":0,"attackType":1,"damageType":1,"attackAnger":10},{"target":[{"id":"1","fId":0,"action":1,"hp":24,"anger":13}],"attackSide":1,"currentTime":3.636,"targetType":2,"delayTime":1.2120000000000002,"sequence":["1","1"],"camp":"player","attacker":"1","attackerFid":0,"attackType":1,"damageType":1,"attackAnger":10},{"target":[{"id":"1","fId":0,"action":1,"hp":24,"anger":13}],"attackSide":2,"currentTime":3.636,"targetType":2,"delayTime":0,"sequence":["1","1"],"camp":"enemy","attacker":"1","attackerFid":0,"attackType":1,"damageType":1,"attackAnger":10},{"target":[{"id":"1","fId":0,"action":1,"hp":0,"anger":13}],"attackSide":1,"currentTime":4.848,"targetType":2,"delayTime":1.2119999999999997,"sequence":["1","1"],"camp":"player","attacker":"1","attackerFid":0,"attackType":1,"damageType":1,"attackAnger":10}],"battleResult":{"isWin":true}}
 * @param data
 * @returns {*}
 */
function addContent(data) {
    var html = "";
    var attackerId;
    var attackerFid;
    var attacker;
    var target;
    var defense;
    var attackTeam;
    var defenseTeam;
    var player;
    countNum++;
    html += "第" + countNum + "轮战斗";
    for(var i = 0 ; i < data.battleData.length ; i++) {
        attackerId = data.battleData[i].attacker;
        attackerFid = data.battleData[i].attackerFid;
        target = data.battleData[i].target;
        attackTeam = data.battleData[i].attackTeam;
        defenseTeam = data.battleData[i].defenseTeam;

        attacker = getHeroInfo(attackerId);
        if(data.battleData[i].attackSide == 1) {
            html += "<p>";
            html += "第" + (i + 1) + "回合，";
            html += "我方攻击<br/>";
        } else {
            html +="<p style='color:#006dcc'>";
            html += "第" + (i + 1) + "回合，";
            html += "敌方攻击<br/>";
        }
        html += "攻击者：" + attacker.name + "，";
        if(data.battleData[i].poison) {
            html += "中毒，";
        }
        if(data.battleData[i].ice) {
            html += "冰冻，";
        }
        if(data.battleData[i].silence) {
            html += "沉默，";
        }
        if(data.battleData[i].stasis) {
            html += "停滞，";
        }
        html += "血量：" + data.battleData[i].hp + "，";
        if(data.battleData[i].attackType == 2) {
            html += "触发技能，";
        }
        if(data.battleData[i].addAttack) {
            html += "增加攻击力" + data.battleData[i].addAttack + "，";
        }
        if(data.battleData[i].addDamage) {
            html += "伤害提升" + (data.battleData[i].addDamage * 100) + "%，";
        }
        if(data.battleData[i].addSunderArmor) {
            html += "增加破甲" + data.battleData[i].addSunderArmor + "，";
        }
        if(data.battleData[i].addHp) {
            html += "攻击吸血，加" + data.battleData[i].addHp + "点血，";
        }
        if(data.battleData[i].reduceAttack) {
            html += "降低" + data.battleData[i].reduceAttack + "攻击力，";
        }
        if(data.battleData[i].promoteHp) {
            html += "提升生命值" + data.battleData[i].promoteHp + "，";
        }
        if(data.battleData[i].awakeSkill) {
            html += "触发觉醒技能，";
        }
        if(data.battleData[i].fightData) {
            formatterFighData(data.battleData[i].fightData, html);
        }
        if(data.battleData[i].targetType == 1) {
            html += "作用目标己方，";

            for(var j = 0 ; j < target.length ; j++) {
                defense = getHeroInfo(target[j].id);
                if(target[j].action == 5) {
                    html += "友方：" + defense.name + "加血，";
                    html += "加" + target[j].addHp + "点血，当前" + target[j].hp + "点血量";
                }
            }
        } else {
            html += "作用目标敌方，";
            /*if(data.battleData[i].damageType == 1) {
                html += "普通攻击，";
            } else if(data.battleData[i].damageType == 2) {
                html += "暴击，";
            }*/
            html + "对敌方" + target.length + "个单位造成伤害";
            /**
             * beHitted: 1,
             dodge: 2,
             counter: 3,
             block: 4
             */
            for(var j = 0 ; j < target.length ; j++) {
                defense = getHeroInfo(target[j].id);
                if(target[j].damageType == 1) {
                    html += "普通攻击，";
                } else if(target[j].damageType == 2) {
                    html += "暴击，";
                } else if(target[j].damageType == 3) {
                    html += "额外伤害，";
                } else if(target[j].damageType == 4) {
                    html += "溅射伤害，";
                }
                html += "防守者：" + defense.name + "，";
                if(target[j].assimilate) {
                    html += "吸收伤害，";
                    for(var k = 0 ; k < target[j].assimilate.length ; k++) {
                        player = getHeroInfo(parseInt(target[j].assimilate[k].playerId));
                        html += "吸收" + player.name + "的" + target[j].assimilate[k].damage + "点伤害，";
                    }
                }
                if(target[j].ignoreSkill) {
                    html += "忽略技能，";
                }
                if(target[j].poison) {
                    html += "中毒，";
                }
                if(target[j].triggerSkill) {
                    html += "防守者触发技能，";
                }
                if(target[j].awakeSkill) {
                    html += "防守者触发觉醒技能，";
                }
                if(target[j].reduceDamage) {
                    html += "减伤：" + target[j].reduceDamage + "，";
                }
                if(target[j].addDefense) {
                    html += "增加护甲：" + target[j].addDefense + "，";
                }
                if(target[j].transfer) {
                    html += "转移伤害，";
                }
                if(target[j].addMaxHp) {
                    html += "增加生命上限：" + target[j].addMaxHp + "，";
                }
                if(target[j].addDodge) {
                    html += "增加闪避：" + target[j].addDodge + "，";
                }
                if(target[j].action == 1) {
                    html += "被击中，";
                    html += "减" + target[j].reduceBlood + "点血，当前" + target[j].hp + "点血量";
                } else if(target[j].action == 2) {
                    html += "闪避，";
                    html += "减" + target[j].reduceBlood + "点血，当前" + target[j].hp + "点血量";
                } else if(target[j].action == 4) {
                    html += "格挡，";
                    html += "减" + target[j].reduceBlood + "点血，当前" + target[j].hp + "点血量";
                } else if(target[j].action == 6) {
                    html += "抵挡伤害，";
                    html += "减" + target[j].reduceBlood + "点血，当前" + target[j].hp + "点血量";
                } else if(target[j].action == 7) {
                    html += "被斩杀，";
                    html += "减" + target[j].reduceBlood + "点血，当前" + target[j].hp + "点血量";
                }
                if(target[j].isCounter) {
                    html += "防守者：" + defense.name + "反击，";
                    html += "反击伤害：" + target[j].counterValue;
                }
                if(target[j].fightData) {
                    formatterFighData(target[j].fightData, html);
                }
            }
        }
        html += "攻击阵营，";
        for(var j = 0 ; j < attackTeam.length ; j++) {
            player = getHeroInfo(attackTeam[j].id);
            html += "攻击者：" + player.name + "，";
            if(attackTeam[j].poison === false) {
                html += "不再继续中毒，";
            }
            if(attackTeam[j].addHp) {
                html += "加血" + attackTeam[j].addHp + "，";
            }
        }
        html += "防守阵营，";
        for(var j = 0 ; j < defenseTeam.length ; j++) {
            player = getHeroInfo(defenseTeam[j].id);
            html += "防守者：" + player.name + "，";
            if(defenseTeam[j].poison === false) {
                html += "不再继续中毒，";
            }
            if(defenseTeam[j].addHp) {
                html += "加血" + attackTeam[j].addHp + "，";
            }
        }
        html += "<br/>";
        html += "</p>";
    }
    return html;
}

/**
 *
 * @param data
 */
function formatterFighData(data, html) {
    var attackerId;
    var attackerFid;
    var attacker;
    var target;
    var defense;
    var attackTeam;
    var defenseTeam;
    var player;

    attackerId = data.attacker;
    attackerFid = data.attackerFid;
    target = data.target;
    attackTeam = data.attackTeam;
    defenseTeam = data.defenseTeam;

    attacker = getHeroInfo(attackerId);

    html += "攻击者：" + attacker.name + "，";
    if(data.poison) {
        html += "中毒，";
    }
    if(data.ice) {
        html += "冰冻，";
    }
    if(data.silence) {
        html += "沉默，";
    }
    if(data.stasis) {
        html += "停滞，";
    }
    html += "血量：" + data.hp + "，";
    if(data.attackType == 2) {
        html += "触发技能，";
    }
    if(data.addAttack) {
        html += "增加攻击力" + data.addAttack + "，";
    }
    if(data.addDamage) {
        html += "伤害提升" + (data.addDamage * 100) + "%，";
    }
    if(data.addSunderArmor) {
        html += "增加破甲" + data.addSunderArmor + "，";
    }
    if(data.addHp) {
        html += "攻击吸血，加" + data.addHp + "点血，";
    }
    if(data.reduceAttack) {
        html += "降低" + data.reduceAttack + "攻击力，";
    }
    if(data.promoteHp) {
        html += "提升生命值" + data.promoteHp + "，";
    }
    if(data.awakeSkill) {
        html += "触发觉醒技能，";
    }
    if(data.targetType == 1) {
        html += "作用目标己方，";

        for(var j = 0 ; j < target.length ; j++) {
            defense = getHeroInfo(target[j].id);
            if(target[j].action == 5) {
                html += "友方：" + defense.name + "加血，";
                html += "加" + target[j].addHp + "点血，当前" + target[j].hp + "点血量";
            }
        }
    } else {
        html += "作用目标敌方，";
        /*if(data.damageType == 1) {
         html += "普通攻击，";
         } else if(data.damageType == 2) {
         html += "暴击，";
         }*/
        html + "对敌方" + target.length + "个单位造成伤害";
        /**
         * beHitted: 1,
         dodge: 2,
         counter: 3,
         block: 4
         */
        for(var j = 0 ; j < target.length ; j++) {
            defense = getHeroInfo(target[j].id);
            if(target[j].damageType == 1) {
                html += "普通攻击，";
            } else if(target[j].damageType == 2) {
                html += "暴击，";
            } else if(target[j].damageType == 3) {
                html += "额外伤害，";
            } else if(target[j].damageType == 4) {
                html += "溅射伤害，";
            }
            html += "防守者：" + defense.name + "，";
            if(target[j].assimilate) {
                html += "吸收伤害，";
                for(var k = 0 ; k < target[j].assimilate.length ; k++) {
                    player = getHeroInfo(parseInt(target[j].assimilate[k].playerId));
                    html += "吸收" + player.name + "的" + target[j].assimilate[k].damage + "点伤害，";
                }
            }
            if(target[j].ignoreSkill) {
                html += "忽略技能，";
            }
            if(target[j].poison) {
                html += "中毒，";
            }
            if(target[j].triggerSkill) {
                html += "防守者触发技能，";
            }
            if(target[j].awakeSkill) {
                html += "防守者触发觉醒技能，";
            }
            if(target[j].reduceDamage) {
                html += "减伤：" + target[j].reduceDamage + "，";
            }
            if(target[j].addDefense) {
                html += "增加护甲：" + target[j].addDefense + "，";
            }
            if(target[j].transfer) {
                html += "转移伤害，";
            }
            if(target[j].addMaxHp) {
                html += "增加生命上限：" + target[j].addMaxHp + "，";
            }
            if(target[j].addDodge) {
                html += "增加闪避：" + target[j].addDodge + "，";
            }
            if(target[j].action == 1) {
                html += "被击中，";
                html += "减" + target[j].reduceBlood + "点血，当前" + target[j].hp + "点血量";
            } else if(target[j].action == 2) {
                html += "闪避，";
                html += "减" + target[j].reduceBlood + "点血，当前" + target[j].hp + "点血量";
            } else if(target[j].action == 4) {
                html += "格挡，";
                html += "减" + target[j].reduceBlood + "点血，当前" + target[j].hp + "点血量";
            } else if(target[j].action == 6) {
                html += "抵挡伤害，";
                html += "减" + target[j].reduceBlood + "点血，当前" + target[j].hp + "点血量";
            } else if(target[j].action == 7) {
                html += "被斩杀，";
                html += "减" + target[j].reduceBlood + "点血，当前" + target[j].hp + "点血量";
            }
            if(target[j].isCounter) {
                html += "防守者：" + defense.name + "反击，";
                html += "反击伤害：" + target[j].counterValue;
            }
        }
    }
    html += "攻击阵营，";
    for(var j = 0 ; j < attackTeam.length ; j++) {
        player = getHeroInfo(attackTeam[j].id);
        html += "攻击者：" + player.name + "，";
        if(attackTeam[j].poison === false) {
            html += "不再继续中毒，";
        }
        if(attackTeam[j].addHp) {
            html += "加血" + attackTeam[j].addHp + "，";
        }
    }
    html += "防守阵营，";
    for(var j = 0 ; j < defenseTeam.length ; j++) {
        player = getHeroInfo(defenseTeam[j].id);
        html += "防守者：" + player.name + "，";
        if(defenseTeam[j].poison === false) {
            html += "不再继续中毒，";
        }
        if(defenseTeam[j].addHp) {
            html += "加血" + attackTeam[j].addHp + "，";
        }
    }
}

function getHeroInfo(heroId) {
    for(var i = 0 ; i < heros.length ; i++) {
        if(heros[i].heroId == heroId) {
            return heros[i];
        }
    }
    return null;
}

var Hero = function() {
    this.h = 0;
    this.l = 0;
    this.f = 0;
    this.s1 = 0;
    this.s2 = 0;
    this.s3 = 0;
}

var shortName = {
    heroId: "h",
    level: "l",
    formationId: "f",
    skillId1: "s1",
    skillId2: "s2",
    skillId3: "s3"
}

function selectpicker() {
    $("select[data-name='selectHero']").selectpicker({style: 'btn-primary', menuStyle: 'dropdown-inverse'});
    $("select[data-name='selectLevel']").selectpicker({style: 'btn-primary', menuStyle: 'dropdown-inverse'});
    $("select[data-name='selectFormationId']").selectpicker({style: 'btn-primary', menuStyle: 'dropdown-inverse'});
    $("select[data-name='selectSkillId1']").selectpicker({style: 'btn-primary', menuStyle: 'dropdown-inverse'});
    $("select[data-name='selectSkillId2']").selectpicker({style: 'btn-primary', menuStyle: 'dropdown-inverse'});
    $("select[data-name='selectSkillId3']").selectpicker({style: 'btn-primary', menuStyle: 'dropdown-inverse'});
}

function checkTeam(team) {
    if(team.length <= 0) {
        return false;
    }
    return true;
}

function checkHeros(heros) {
    for(var i = 0 ; i < heros.length ; i++) {
        for(var j in heros[i]) {
            if(j == "s1")
                continue;
            if(j == "s2")
                continue;
            if(j == "s3")
                continue;
            if(heros[i][j] == 0)
                return false;
        }
    }
    return true;
}

function getHero(dom) {
    var hero = new Hero();
    var select = null;
    $(dom).children("div").each(function() {
        select = $(this).children("select");
        if(select.attr("data-id") == "selectHero") {
            hero.h = select.val();
        } else if(select.attr("data-id") == "selectLevel") {
            hero.l = select.val();
        } else if(select.attr("data-id") == "selectFormationId") {
            hero.f = parseInt(select.val()) + 1;
        } else if(select.attr("data-id") == "selectSkillId1") {
            hero.s1 = select.val();
        } else if(select.attr("data-id") == "selectSkillId2") {
            hero.s2 = select.val();
        } else if(select.attr("data-id") == "selectSkillId3") {
            hero.s3 = select.val();
        }
    });
    return hero;
}