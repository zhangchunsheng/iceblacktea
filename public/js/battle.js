/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-06-25
 * Description: battle
 */
$(document).ready(function() {
    $("div .hero").click(function() {

    });

    $("#battle").click(function() {
        $("#myModal").modal('show');

        var data = {
            uid: 1,
            loginName: "wozlla",
            registerType: 1,
            sessionId: "729B28D90AB2E90B494F7DD71976666F",
            token: "6d90953e70d8e81e25b461f515a4a6cb159e74ea3067c71b92d862e3ad9c61e5"
        };
        pomelo.request('battle.battleHandler.fight', {
            sessionId: data.sessionId,
            token: data.token,
            induId: 1,
            mgid: "MG101011"
        }, function(data) {
            console.log(data);
            //$("#myModal > .modal-body").html(JSON.stringify(data));
            addContent("共" + data.battleData.length + "轮战斗");
            for(var i = 0 ; i < data.battleData.length ; i++) {
                if(data.battleData[i].attackSide == 1) {
                    addContent("己方攻击：", "green");
                } else {
                    addContent("敌方攻击", "green");
                }
                //攻方
                addContent("攻方：");
                addContent("攻方位置：" + data.battleData[i].attackData.fId);
                if(data.battleData[i].attackData.action == 1) {
                    addContent("普通攻击");
                } else {
                    addContent("技能攻击");
                    addContent("技能Id：" + data.battleData[i].attackData.skillId);
                }
                addContent("攻击伤害：" + data.battleData[i].attackData.attack);
                if(data.battleData[i].attackData.hasBuff) {
                    addContent("有buff");
                } else {
                    addContent("没有buff");
                }
                if(data.battleData[i].attackData.isCritHit) {
                    addContent("暴击");
                }
                addContent("增加怒气：" + data.battleData[i].defenseData.addAnger);
                addContent("血量：" + data.battleData[i].attackData.hp, "#99083c");

                //守方
                addContent("守方：");
                addContent("守方位置：" + data.battleData[i].defenseData.fId);
                if(data.battleData[i].defenseData.action == 1) {//1 - 被击中 2 - 闪避
                    addContent("被击中");
                } else if(data.battleData[i].defenseData.action == 2) {
                    addContent("闪避");
                }
                if(data.battleData[i].defenseData.isBlock) {
                    addContent("格挡");
                }
                if(data.battleData[i].defenseData.isCounter) {
                    addContent("反击");
                    addContent("反击伤害：" + data.battleData[i].defenseData.counterValue);
                }
                addContent("减血：" + data.battleData[i].defenseData.reduceBlood);
                addContent("增加怒气：" + data.battleData[i].defenseData.addAnger);
                addContent("血量：" + data.battleData[i].defenseData.hp, "#99083c");

                addContent("延迟等待：" + data.battleData[i].delayTime);
            }
        });
    });
});

function addContent(content, color) {
    var timerId = setTimeout(function() {
        if(!color)
            color = "#000000";
        $("#myModal > .modal-body").append("<li style='color:" + color + ";'>" + content + "</li>");
        clearTimeout(timerId);
    }, 1000);
}

authEntry(data.uid, data.sessionId, data.token, function(data) {
    console.log(data);
});