/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-07-09
 * Description: character
 */
var SCOPE = {
    PRI: '49237U',
    AREA: 'IVNAS2',
    ALL: 'G23947'
};
$(document).ready(function() {
    $("select[name='host']").selectpicker({style: 'btn-primary', menuStyle: 'dropdown-inverse'});
    $("select[name='port']").selectpicker({style: 'btn-primary', menuStyle: 'dropdown-inverse'});
    $("div .hero").click(function() {

    });

    $("#connect").click(function() {
        connectServer();
        return false;
    });

    $("#createMainPlayer").click(function() {
        $("#myModal").modal('show');

        var data = {
            uid: 1,
            loginName: "wozlla",
            registerType: 1,
            sessionId: "729B28D90AB2E90B494F7DD71976666F",
            token: "6d90953e70d8e81e25b461f515a4a6cb159e74ea3067c71b92d862e3ad9c61e5"
        };
        pomelo.request('connector.roleHandler.createMainPlayer', {
            sessionId: data.sessionId,
            token: data.token,
            cId: 1,
            nickname: "test"
        }, function(data) {
            console.log(data);
            for(var o in data.player) {
                addContent(o + ": " + data.player[o]);
            }
        });
    });

    $("#getInduInfo").click(function() {
        $("#myModal").modal('show');
        pomelo.request('scene.induHandler.getInduInfo', {
            induId: "Ins10204"
        }, function(data) {
            console.log(data);
            $("#myModal > .modal-body").empty();
            for(var o in data.induInfo) {
                addContent(o + ": " + data.induInfo[o]);
            }
        });
        return false;
    });

    $("#getMonstergroup").click(function() {
        $("#myModal").modal('show');
        pomelo.request('scene.induHandler.getMonstergroup', {
            mgid: "MG102041"
        }, function(data) {
            console.log(data);
            $("#myModal > .modal-body").empty();
            for(var o in data.induMonstergroup) {
                addContent(o + ": " + data.induMonstergroup[o]);
            }
        });
        return false;
    });

    $("#enterScene").click(function() {
        $("#myModal").modal('show');
        $("#myModal > .modal-body").empty();
        pomelo.request('area.playerHandler.enterScene', {

        }, function(data) {
            console.log(data);
        });
        return false;
    });

    /**
     * 切换场景
     */
    $("#changeScene").click(function() {
        $("#myModal").modal('show');
        var sceneId = $("#sceneId").val();
        pomelo.request('area.playerHandler.changeArea', {
            currentScene: "city01",
            target: sceneId
        }, function(data) {
            console.log(data);
            $("#myModal > .modal-body").empty();
            addContent("sceneId: " + data.currentScene);
        });
        return false;
    });

    /**
     * 装载武器
     */
    $("#wearWeapon").click(function() {
        $("#myModal").modal('show');
        var index = 2;//1
        var weaponId = "W0201";//W0201
        pomelo.request('area.equipHandler.wearWeapon', {
            index: index,
            weaponId: weaponId
        }, function(data) {
            console.log(data);
        });
        return false;
    });

    /**
     * 卸载武器
     */
    $("#unWearWeapon").click(function() {
        $("#myModal").modal('show');
        var weaponId = "W0201";//W0201
        pomelo.request('area.equipHandler.unWearWeapon', {
            weaponId: weaponId
        }, function(data) {
            console.log(data);
        });
        return false;
    });

    /**
     * 装载装备
     * WEAPON: 'weapon',//武器
     * NECKLACE: 'necklace',//项链
     * HELMET: 'helmet',//头盔
     * ARMOR: 'armor' ,//护甲 衣服
     * BELT: 'belt',//腰带
     * LEGGUARD: 'legguard',//护腿 裤子
     * AMULET: 'amulet',//护符
     * SHOES: 'shoes',//鞋
     * RING: 'ring'//戒指
     */
    $("#equip").click(function() {
        $("#myModal").modal('show');
        var index = 1;//1
        var eqId = "W0201";//W0201
        var pkgType = "weapons";
        pomelo.request('area.equipHandler.equip', {
            index: index,
            eqId: eqId,
            pkgType: pkgType
        }, function(data) {
            console.log(data);
        });
        return false;
    });

    /**
     * 卸载装备
     */
    $("#unEquip").click(function() {
        $("#myModal").modal('show');
        var type = "weapon";//weapon armor
        var eqId = "W0201";//W0201 W90101
        pomelo.request('area.equipHandler.unEquip', {
            eqId: eqId,
            type: type
        }, function(data) {
            console.log(data);
        });
        return false;
    });

    /**
     * 升级装备
     */
    $("#upgrade").click(function() {
        $("#myModal").modal('show');
        var type = "weapon";
        var eqId = "W0201";//W0201
        pomelo.request('area.equipHandler.upgrade', {
            eqId: eqId,
            type: type
        }, function(data) {
            console.log(data);
        });
        return false;
    });

    /**
     * 进入副本
     */
    $("#enterIndu").click(function() {
        $("#myModal").modal('show');
        var induId = "Ins10101";
        pomelo.request('area.playerHandler.enterIndu', {
            induId: induId
        }, function(data) {
            console.log(data);
        });
        return false;
    });

    /**
     * 离开副本
     */
    $("#leaveIndu").click(function() {
        $("#myModal").modal('show');
        var induId = "Ins10101";
        pomelo.request('area.playerHandler.leaveIndu', {
            induId: induId
        }, function(data) {
            console.log(data);
        });
        return false;
    });

    /**
     * 获得伙伴
     */
    $("#getPartner").click(function() {
        $("#myModal").modal('show');
        var cId = 3;
        pomelo.request('area.playerHandler.getPartner', {
            cId: cId
        }, function(data) {
            console.log(data);
        });
        return false;
    });

    /**
     * 加载资源
     */
    $("#loadResource").click(function() {
        $("#myModal").modal('show');
        pomelo.request('area.resourceHandler.loadResource', {
            version: {}
        }, function(data) {
            console.log(data);
        });
        return false;
    });

    /**
     * 战斗
     */
    $("#battle").click(function() {
        $("#myModal").modal('show');
        pomelo.request('area.battleHandler.battle', {
            eid: "MG101011"
        }, function(data) {
            console.log(data);
        });
        return false;
    });

    /**
     * 触发事件
     */
    $("#triggerEvent1").click(function() {
        $("#myModal").modal('show');
        var eid = $("#eid").val();
        if(eid == "") {
            alert("no eid");
            return;
        }
        pomelo.request('area.induHandler.triggerEvent', {
            eid: eid
        }, function(data) {
            console.log(data);
        });
        return false;
    });

    /**
     * 触发事件
     */
    $("#triggerEvent2").click(function() {
        $("#myModal").modal('show');
        var eid = $("#eid").val();
        if(eid == "") {
            alert("no eid");
            return;
        }
        pomelo.request('area.induHandler.triggerEvent', {
            eid: eid
        }, function(data) {
            console.log(data);
        });
        return false;
    });

    /**
     * 更改阵型
     */
    $("#changeFormation").click(function() {
        $("#myModal").modal('show');
        var formation = [{playerId:"S1C10"},{playerId:"S1C10P6"},null,null,null,null,null];
        pomelo.request('area.formationHandler.change', {
            formation: formation
        }, function(data) {
            console.log(data);
        });
        return false;
    });

    /**
     * 购买
     */
    $("#buyItem").click(function() {
        $("#myModal").modal('show');
        var wid = "D10010101";
       // var wid="W0101";
        var num = 1;
        pomelo.request('area.shopHandler.buyItem', {
            wid: wid,
            num: num
        }, function(data) {
            console.log(data);
        });
        return false;
    });

    /**
     * 添加物品至背包
     */
    $("#addItem").click(function() {
        $("#myModal").modal('show');
        pomelo.request('area.packageHandler.addItem', {
            itemId: "W0101",
            itemNum: 1,
            itemLevel: 1
        }, function(data) {
            console.log(data);
        });
        return false;
    });

    /**
     * 出售
     */
    $("#sellItem").click(function() {
       $("myModal").modal('show');
       pomelo.request('area.packageHandler.sellItem', {
           type: "items", //weapons equipments items
           index: 1,
           itemNum: 9,
           itemId: "D10010101"
       }, function(data) {
           console.log(data);
       });
        return false;
    });

    /**
     *丢弃
     */
    $("#discardItem").click(function() {
        $("myModal").modal('show');
        pomelo.request('area.packageHandler.discardItem', {
            type: "items", //weapons equipments items
            index: 1,
            itemNum: 1,
            itemId: "D10010101"
        }, function(data) {
            console.log(data);
        });
        return false;
    });

    /**
     * 添加好友
     */
    $("#addFriend").click(function() {
        $("#myModal").modal('show');
        var playerId = "S1C12";
        pomelo.request('area.friendHandler.add', {
            playerId: playerId
        }, function(data) {
            console.log(data);
        });
        return false;
    });

    /**
     * 删除好友
     */
    $("#delFriend").click(function() {
        $("#myModal").modal('show');
        var playerId = "S1C11";
        pomelo.request('area.friendHandler.remove', {
            playerId: playerId
        }, function(data) {
            console.log(data);
        });
        return false;
    });

    /**
     * 获得好友
     */
    $("#getFriend").click(function() {
        $("#myModal").modal('show');
        var start = 0;
        var stop = 10;
        pomelo.request('area.friendHandler.get', {
            start: start,
            stop: stop
        }, function(data) {
            console.log(data);
        });
        return false;
    });

    /**
     * 加入竞技场
     */
    $("#arena_add").click(function() {
        $("#myModal").modal('show');
        pomelo.request('area.arenaHandler.add', {

        }, function(data) {
            console.log(data);
        });
        return false;
    });

    /**
     * 获得竞技场排名
     */
    $("#arena_getRank").click(function() {
        $("#myModal").modal('show');
        pomelo.request('area.arenaHandler.getRank', {

        }, function(data) {
            console.log(data);
        });
        return false;
    });

    /**
     * 获得竞技场对手
     */
    $("#arena_getOpponents").click(function() {
        $("#myModal").modal('show');
        pomelo.request('area.arenaHandler.getOpponents', {

        }, function(data) {
            console.log(data);
        });
        return false;
    });

    /**
     * 竞技场pk
     */
    $("#arena_pk").click(function() {
        $("#myModal").modal('show');
        pomelo.request('area.arenaHandler.pk', {
            vsPlayerId: "S1C11"
        }, function(data) {
            console.log(data);
        });
        return false;
    });

    /**
     * 接任务
     */
    $("#startTask").click(function() {
        $("#myModal").modal('show');
        pomelo.request('area.taskHandler.startTask', {
            taskId: "10101"
        }, function(data) {
            console.log(data);
        });
        return false;
    });

    /**
     * 交任务
     */
    $("#handOverTask").click(function() {
        $("#myModal").modal('show');
        pomelo.request('area.taskHandler.handOverTask', {
            taskId: "10101"
        }, function(data) {
            console.log(data);
        });
        return false;
    });

    /**
     * 收件箱
     */
    $("#getInbox").click(function(){
        $("#myModal").modal('show');
        pomelo.request('area.mailHandler.getInbox',{
            start: 0,
            end: 9
        }, function(data) {
            console.log(data);
        });
        return false;
    });

    /**
     * 发件箱
     */
    $('#getOutbox').click(function(){
        $('#myModal').modal('show');
        pomelo.request('area.mailHandler.getOutbox',{
            start: 0,
            end: 9
        },function(data) {
            console.log(data);
        });
        return false;
    });

    /**
     * 发邮件
     */
    $("#sendMail").click(function(){
        $("#myModal").modal('show');
        pomelo.request('area.mailHandler.sendMail',{
            to: "S1C11",
            content: "我去年买了个表！",
            title: "我做了拉"
        },function(data){
            console.log(data);
        });
        return false;
    });

    /**
     * 系统发送邮件
     */
    $('#systemSendMail').click(function(){
        $('#myModal').modal('show');
        pomelo.request('area.mailHandler.systemSendMail',{
            to: "S1C10",
            content: "我去年买了个包",
            title: "系统消息",
            type: 1
        }, function(data) {
            console.log(data);
        });
        return false;
    });

    /**
     * 读取邮件
     */
    $('#readMail').click(function() {
        $('#myModal').modal('show');
        pomelo.request('area.mailHandler.readMail',{
            mailId: "ERN71"
        }, function(data){
            console.log(data);
        });
        return false;
    });

    /**
     * 领取物品
     */
    $('#collectItem').click(function() {
        $('#myModal').modal('show');
        pomelo.request('area.mailHandler.collectItem',{
            mailId: 'ERW66',
            itemIndex:0
        }, function(data) {
            console.log(data);
        });
        return false;
    });

    /**
     * 删除邮件
     */
    $('#delMail').click(function() {
        $('myModal').modal('show');
        pomelo.request('area.mailHandler.delMail',{
            mailId: 'ERW67'
        }, function(data) {
            console.log(data);
        });
        return false;
    });

    /**
     * 查看新消息个数
     */
    $('#hasNewMail').click(function() {
        $('myModal').modal('show');
        pomelo.request('area.mailHandler.hasNewMail', {

        }, function(data) {
            console.log(data);
        });
        return false;
    });

    /**
     * 自动清理收件箱
     */
    $('#systemDelR').click(function() {
       $('myModal').modal('show');
        pomelo.request('area.mailHandler.systemDelR', {

        }, function(data) {
            console.log(data);
        });
        return false;
    });

    /**
     * 自动清理收件箱
     */
    $('#systemDelS').click(function() {
        $('myModal').modal('show');
        pomelo.request('area.mailHandler.systemDelS', {

        }, function(data) {
            console.log(data);
        });
        return false;
    });

    /**
     * 聊天
     */
    $("#chat_to_all").click(function() {
        $("#myModal").modal('show');
        var content = $("#content").val();
        var defaultScope = SCOPE.ALL;
        pomelo.request('chat.chatHandler.send', {
            from: "wozlla",
            scope: defaultScope,
            content: content,
            currentScene: "city02",
            toName: ""
        }, function(data) {
            console.log(data);
        });
        return false;
    });

    /**
     * 私聊
     */
    $("#chat_to_priv").click(function() {
        $("#myModal").modal('show');
        var content = $("#content").val();
        var defaultScope = SCOPE.PRI;
        pomelo.request('chat.chatHandler.send', {
            from: "wozlla",
            scope: defaultScope,
            content: content,
            currentScene: "city02",
            toName: "html5"
        }, function(data) {
            console.log(data);
        });
        return false;
    });

    /**
     * 场景讲话
     */
    $("#chat_to_area").click(function() {
        $("#myModal").modal('show');
        var content = $("#content").val();
        var defaultScope = SCOPE.AREA;
        pomelo.request('chat.chatHandler.send', {
            from: "wozlla",
            scope: defaultScope,
            content: content,
            currentScene: "city02",
            toName: "html5"
        }, function(data) {
            console.log(data);
        });
        return false;
    });
});

/**
 * 读取redis
 */
$("#readRedis").click(function() {
    var that = this;
    var serverId = $("#serverId").val();
    var registerType = $("#registerType").val();
    var loginName = $("#loginName").val();
    $.ajax({
        type: "post",
        data: {
            serverId: serverId,
            registerType: registerType,
            loginName: loginName
        },
        url: 'character/readRedis',
        success: function(data, status) {
            var data = JSON.parse(data);
            $('#myModal').modal('show');
            $("#myModal > .modal-body").empty();
            unserialize(data);
        }
    });
    return false;
});

function unserialize(data) {
    for(var o in data) {
        if(typeof data[o] == "object") {
            unserialize(data[o]);
        } else {
            if(o == "package" || o == "equipments") {
                addContent(o + ": " + data[o], "green");
            } else {
                addContent(o + ": " + data[o]);
            }
        }
    }
}

/**
 * 写入redis
 */
$("#writeRedis").click(function() {
    var that = this;
    var serverId = $("#serverId").val();
    var registerType = $("#registerType").val();
    var loginName = $("#loginName").val();
    var field = $("#field").val();
    var value = $("#value").val();
    $.ajax({
        type: "post",
        data: {
            serverId: serverId,
            registerType: registerType,
            loginName: loginName,
            field: field,
            value: value
        },
        url: 'character/writeRedis',
        success: function(data, status) {
            var data = JSON.parse(data);
            if(data.result == 1) {
                utils.alert(that, "写入成功！");
            } else {
                utils.alert(that, "写入失败！");
            }
        }
    });
    return false;
});

function addContent(content, color) {
    var timerId = setTimeout(function() {
        if(!color)
            color = "#000000";
        $("#myModal > .modal-body").append("<li style='color:" + color + ";'>" + content + "</li>");
        clearTimeout(timerId);
    }, 1000);
}

data = {
    code: 200,
    loginName: "html5",
    registerType: 1,
    sessionId: "43AEEFC19CCE04583BBCDC961034B75C",
    token: "2a1e5f5238a083bf974d15cf61b2547104673e6743300c55d1d4461e2701517c",
    uid: 5
};

function connectServer() {
    GATE_HOST = $("#host").val();
    GATE_PORT = $("#port").val();
    authEntry(data.uid, data.sessionId, data.token, function(data) {
        console.log(data);
        var html = '<ul style="list-style-type: none">';
        for(var o in data.player) {
            if(typeof data.player[o] == "object") {
                html += "<li>" + o + ": </li>";
                for(var o1 in data.player[o]) {
                    html += "<li>" + o1 + ": " + data.player[o][o1] + "</li>";
                }
            } else {
                html += "<li>" + o + ": " + data.player[o] + "</li>";
            }
        }
        html += "</ul>";
        $("#character").append(html);
    });
    return false;
}

function testConnect() {
    GATE_HOST = "192.168.1.22";
    GATE_PORT = "6014";
    authEntry(data.uid, data.sessionId, data.token, function(data) {
        console.log(data);
        var html = '<ul style="list-style-type: none">';
        for(var o in data.player) {
            if(typeof data.player[o] == "object") {
                html += "<li>" + o + ": </li>";
                for(var o1 in data.player[o]) {
                    html += "<li>" + o1 + ": " + data.player[o][o1] + "</li>";
                }
            } else {
                html += "<li>" + o + ": " + data.player[o] + "</li>";
            }
        }
        html += "</ul>";
        $("#character").append(html);
    });
}

//testConnect();

/**
 * 用户退出
 */
pomelo.on("onUserLeave", function(data) {
    console.log(data);
});

/**
 * 用户重新登录
 */
pomelo.on("onKick", function(data) {
    console.log(data);
});

/**
 * 用户升级
 */
pomelo.on("onUpgrade", function(data) {
    console.log(data);
});

/**
 * 聊天
 */
pomelo.on('onChat', function(data) {
    console.log(data);
});

pomelo.on('onCompleteTask', function(data) {
    console.log(data);
});

/**
 * 任务进度
 */
pomelo.on('taskProgress', function(data) {
    console.log(data);
});

/**
 * 奖励
 */
pomelo.on('onRewards', function(data) {
    console.log(data);
});