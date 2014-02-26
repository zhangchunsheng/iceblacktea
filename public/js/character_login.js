/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-07-09
 * Description: character
 */
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

        pomelo.request('connector.roleHandler.createMainPlayer', {
            sessionId: data.sessionId,
            token: data.token,
            cId: 1,
            nickname: $("#nickname").val()
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
        pomelo.request('area.playerHandler.enterScene', {

        }, function(data) {
            console.log(data);
            $("#myModal > .modal-body").empty();
            addContent("sceneId: " + data.sceneId);
        });
        return false;
    });

    /**
     * 切换场景
     */
    $("#changeScene").click(function() {
        $("#myModal").modal('show');
        var sceneId = $("#sceneId").val();
        pomelo.request('scene.sceneHandler.enterScene', {
            sceneId: sceneId
        }, function(data) {
            console.log(data);
            $("#myModal > .modal-body").empty();
            addContent("sceneId: " + data.sceneId);
        });
        return false;
    });

    $("#register").click(function() {
        var loginName = $("#loginName").val();
        var password = $("#password").val();
        var password_verify = $("#password_verify").val();

        var url = "http://192.168.1.99:8090/register";
        var data = {
            registerType: 1,
            loginName: loginName,
            password: hex_md5(password),
            password_verify: hex_md5(password_verify)
        };
        var params = "";
        for(var o in data) {
            params += o + "=" + data[o] + "&"
        }
        params = params.substr(0, params.length - 1);
        console.log(params);
        $.ajax({
            type: "get",
            dataType: "jsonp",
            jsonp: "jsoncallback",
            url: url + "?" + params,
            success: function(data, status) {
                console.log(data);
                window.data = data;
            }
        });
    });

    $("#autoRegister").click(function() {
        var url = "http://192.168.1.99:8090/autoRegister";
        var data = {
            registerType: 2
        };
        var params = "";
        for(var o in data) {
            params += o + "=" + data[o] + "&"
        }
        params = params.substr(0, params.length - 1);
        console.log(params);
        $.ajax({
            type: "get",
            dataType: "jsonp",
            jsonp: "jsoncallback",
            url: url + "?" + params,
            success: function(data, status) {
                console.log(data);
                window.data = data;
            }
        });
    });

    $("#login").click(function() {
        var loginName = $("#loginName").val();
        var password = $("#password").val();

        var url = "http://192.168.1.99:8090/login";
        var data = {
            registerType: 1,
            loginName: loginName,
            password: hex_md5(password)
        };
        var params = "";
        for(var o in data) {
            params += o + "=" + data[o] + "&"
        }
        params = params.substr(0, params.length - 1);
        console.log(params);
        $.ajax({
            type: "get",
            dataType: "jsonp",
            jsonp: "jsoncallback",
            url: url + "?" + params,
            success: function(data, status) {
                console.log(data);
                window.data = data;
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

pomelo.on("onAddEntities", function(data) {
    console.log(data);
});

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

pomelo.on('onChat', function(data) {
    console.log(data);
});