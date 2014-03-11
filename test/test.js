/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-09-23
 * Description: test
 */
var loginInfo = {
    code: 200,
    loginName: "html5",
    registerType: "1",
    sessionId: "6ACEC8A00F404644330E05D0294885A5",
    token: "464363099bc522beb8aff5cf16bbcf019f8516f3bc58e4b2d585d9a40b8d2ac5",
    uid: "5"
};
var loginInfos = [{
    code: 200,
    loginName: "html5",
    registerType: "1",
    sessionId: "6ACEC8A00F404644330E05D0294885A5",
    token: "464363099bc522beb8aff5cf16bbcf019f8516f3bc58e4b2d585d9a40b8d2ac5",
    uid: "5"
}, {//wozlla1
	code: 200,
	loginName: "w182074",
	registerType: 2,
	sessionId: "AF83EFD3C69CA8D277E3A96C66F38DC8",
	token: "a11cf7d9ee3e9dcc326d24bab313e82bb4c0f40c332a704feb2ce8df00da4fda",
	uid: 82095
}, {//wozlla2
	code: 200,
	loginName: "w182075",
	registerType: 2,
	sessionId: "86B09AEC1039A65C418A3CA460C0E935",
	token: "b489525c150bcf4fbaafb0ec6b77ead87f1cfc2fc7e82c8c4da3cf26d211987f",
	uid: 82096
}, {//wozlla3
	code: 200,
	loginName: "w182076",
	registerType: 2,
	sessionId: "F39C9CDB0DFF1F2856E6C4565077109A",
	token: "1bf4b1aaaea02b60d87f3406222b6592364577451b3edc24aff38a51f58e29ef",
	uid: 82097
}, {//wozlla4
	code: 200,
	loginName: "w182077",
	registerType: 2,
	sessionId: "13EE436F2D2F95B74A5B59935029BDB2",
	token: "87af0dfb458ad438fed957a039c943a19b1a63320f58443c54faf9d2e1fd8622",
	uid: 82098
}, {//wozlla5
	code: 200,
	loginName: "w182078",
	registerType: 2,
	sessionId: "9A78D88CEE1A8ECE3F21E7BEDF40B29C",
	token: "af80f94443926a31d96267ff6127bacdc62b4bbf0a9f7bbaec5420641f49d429",
	uid: 82099
}, {//wozlla6
	code: 200,
	loginName: "w182079",
	registerType: 2,
	sessionId: "FDCDF1F92A03E7B74B9EB6E250E6ED4C",
	token: "52ce53aceeba6b38274b7f123fd586b12648714b625ada8ae6e959814ad02226",
	uid: 82100
}];
loginInfo = loginInfos[0];

$(document).ready(function() {
	$("#loginName_token").bind("change", function(e) {
		var loginName = $("#loginName_token").val();
		for(var i = 0 ; i < loginInfos.length ; i++) {
			if(loginInfos[i].loginName == loginName) {
				loginInfo = loginInfos[i];
				break;
			}
		}
	});
	
    $("#register").bind("click", function() {
        var loginName = $("#loginName").val();
        var password = $("#password").val();
        var password_verify = $("#password_verify").val();

        var host = $("#ucenter_host").val();
        var port = $("#ucenter_port").val();
        var url = "http://" + host + ":" + port + "/register";
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
                loginInfo = data;
                console.log(data);
            }
        });
    });

    $("#autoRegister").bind("click", function() {
        var host = $("#ucenter_host").val();
        var port = $("#ucenter_port").val();
        var url = "http://" + host + ":" + port + "/autoRegister";
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
                loginInfo = data;
                console.log(data);
            }
        });
    });

    $("#relevance").bind("click", function() {
        var loginName = $("#loginName").val();
        var password = $("#password").val();
        var password_verify = $("#password_verify").val();

        var host = $("#ucenter_host").val();
        var port = $("#ucenter_port").val();
        var url = "http://" + host + ":" + port + "/relevance";
        var data = {
            registerType: 1,
            loginName: loginName,
            password: hex_md5(password),
            password_verify: hex_md5(password_verify),
            bindRegisterType: 2,
            bindAccount: "w100001"
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
            }
        });
    });

    $("#login").bind("click", function() {
        var loginName = $("#loginName").val();
        var password = $("#password").val();

        var host = $("#ucenter_host").val();
        var port = $("#ucenter_port").val();
        var url = "http://" + host + ":" + port + "/login";
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
                loginInfo = data;
            }
        });
    });

    $("#multiLogin").bind("click", function() {
        var loginName = $("#loginName").val();
        var password = $("#password").val();

        var host = $("#ucenter_host").val();
        var port = $("#ucenter_port").val();
        var url = "http://" + host + ":" + port + "/multiLogin";
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
            }
        });
    });

    $("#hasSession").bind("click", function() {
        var host = $("#ucenter_host").val();
        var port = $("#ucenter_port").val();
        var url = "http://" + host + ":" + port + "/hasSession";
        var data = {
            sessionId: ""
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
            }
        });
    });
	
	$("#getServerList").bind("click", function() {
        var host = $("#ucenter_host").val();
        var port = $("#ucenter_port").val();
        var url = "http://" + host + ":" + port + "/getServerList";
        var data = {
            token: loginInfo.token
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
            }
        });
    });

    $("#auth").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/auth";

        var data = {
            token: loginInfo.token
        };
        var params = "";
        for(var o in data) {
            params += o + "=" + data[o] + "&"
        }
        params = params.substr(0, params.length - 1);
        console.log(params);
        /*$.ajax({
            type: "get",
            dataType: "jsonp",
            jsonp: "jsoncallback",
            url: url + "?" + params,
            success: function(data, status) {
                console.log(data);
            }
        });*/
		console.log(url + "?" + params);
		$.ajax({
            type: "get",
            url: url + "?" + params,
			xhrFields: {withCredentials: true},
            success: function(data, status) {
                console.log(JSON.parse(data));
            }
        });
    });

    $("#createMainPlayer").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/role/createMainPlayer";

        var data = {
            cId: "H1101",
            nickname: $("#nickname").val(),
            isRandom: 0
        };
        var params = "";
        for(var o in data) {
            params += o + "=" + data[o] + "&"
        }
        params = params.substr(0, params.length - 1);
        console.log(params);
        /*$.ajax({
            type: "get",
            dataType: "jsonp",
            jsonp: "jsoncallback",
            url: url + "?" + params,
            success: function(data, status) {
                console.log(data);
            }
        });*/
		$.ajax({
            type: "get",
            url: url + "?" + params,
			xhrFields: {withCredentials: true},
            success: function(data, status) {
                console.log(data);
            }
        });
    });

    $("#getMainPlayer").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/role/getMainPlayer";

        var data = {

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
            }
        });
    });

    $("#getNickname").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/role/getNickname";

        var data = {

        };
        request(url, data);
    });

    $("#removeMainPlayer").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/role/removeMainPlayer";

        var data = {

        };
        request(url, data);
    });

    $("#testCreateMainPlayer").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/role/testCreateMainPlayer";

        var data = {

        };
        request(url, data);
    });
	
	$("#getPlayerInfo").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/player/getPlayerInfo";

        var data = {
			playerId: "S1C5000"
        };
        request(url, data);
    });

    $("#battle").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/battle/battle";

        var data = {
            eid: "MG101011"
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
            }
        });
    });

    $("#enterScene").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/player/enterScene";

        var data = {

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
            }
        });
    });

    $("#changeArea").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/player/changeArea";

        var data = {
            currentScene: "city01",
            target: "city02"
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
            }
        });
    });

    $("#changeAndGetSceneData").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/player/changeAndGetSceneData";

        var data = {
            currentScene: $("#currentScene").val(),
            target: $("#sceneId").val()
        };
        request(url, data);
    });

    $("#getAreaInfo").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/area/getAreaInfo";

        var data = {
            sceneId: $("#sceneId").val()
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
            }
        });
    });
	
	$("#getAreaPlayers").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/area/getAreaPlayers";

        var data = {
            sceneId: $("#sceneId").val()
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
            }
        });
    });
	
	$("#getSceneData").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/area/getSceneData";

        var data = {
            sceneId: $("#sceneId").val(),
			currentPage: $("#currentPage").val()
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
            }
        });
    });

    $("#enterIndu").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/player/enterIndu";

        var data = {
            induId: $("#induId").val()
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
            }
        });
    });

    $("#leaveIndu").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/player/leaveIndu";

        var data = {
            induId: $("#induId").val()
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
            }
        });
    });

    $("#triggerEvent").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/indu/triggerEvent";

        var data = {
            eid: $("#eid").val()
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
            }
        });
    });

    $("#arena_add").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/arena/add";

        var data = {

        };
        request(url, data);
    });

    $("#arena_getRank").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/arena/getRank";

        var data = {

        };
        request(url, data);
    });

    $("#arena_getOpponents").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/arena/getOpponents";

        var data = {

        };
        request(url, data);
    });

    $("#arena_pk").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/arena/pk";

        var data = {
            vsPlayerId: "S1C5000"
        };
        request(url, data);
    });

    $("#enterArena").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/arena/enterArena";

        var data = {

        };
        request(url, data);
    });

    $("#getPKData").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/arena/getPKData";

        var data = {
            battleId: 133620
        };
        request(url, data);
    });

    $("#changeFormation").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/formation/change";

		var formation = {"1":"S1C1","2":"S1C1P4"};
        var data = {
            //formation: encodeURIComponent(JSON.stringify([null,{playerId:"S1C7420"},null,null,null,null,null]))
			formation: encodeURIComponent($("#formation").val())
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
            }
        });
    });
	
	$("#setDefault").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/formation/setDefault";

        var data = {
			formation: encodeURIComponent($("#formation").val()),
			tacticalId: $("#tacticalId").val()
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
            }
        });
    });
	
	$("#save").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/formation/save";

        var data = {
			formation: encodeURIComponent($("#formation").val()),
			tacticalId: $("#tacticalId").val()
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
            }
        });
    });
	
	$("#resetFormation").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/formation/resetFormation";

        var data = {
            
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
            }
        });
    });
	
	$("#unlock").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/formation/unlock";

        var data = {
            positionId: $("#formationId").val(),
			mtype: 1
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
            }
        });
    });
	
	$("#forteAttack").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/formation/forteAttack";

        var data = {
            
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
            }
        });
    });
	
	$("#forteDefense").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/formation/forteDefense";

        var data = {
            
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
            }
        });
    });
	
	$("#setTactical").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/formation/setTactical";

        var data = {
            tacticalId: $("#tacticalId").val()
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
            }
        });
    });
	
	$("#upgradeTactical").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/formation/upgradeTactical";

        var data = {
            tacticalId: $("#tacticalId").val()
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
            }
        });
    });

    /**
     * 添加物品
     */
    $("#addItem").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/package/addItem";

        var data = {
            itemId: $("#itemId").val(),
            itemNum: 1,
            itemLevel: 1
        };
        request(url, data);
    });
	
	$("#buyItem").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/shop/buyItem";

        var data = {
            itemId: $("#itemId").val(),
            itemNum: $("#itemNum").val(),
            npcId: $("#npcId").val(),
			index: $("#pIndex").val(),
        };
        request(url, data);
    });
	
	$("#sellItem").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/package/sellItem";

        var data = {
            index: $("#pIndex").val(),
            itemNum: $("#itemNum").val()
        };
        request(url, data);
    });
	
	$("#_Set").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/package/_Set";

        var data = {
            itemCount: 12,
            items: {}
        };
        request(url, data);
    });
	
	$("#_AddItem").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/package/_AddItem";

        var data = {
            itemId: "W01011",
            itemNum: 1,
			itemLevel: 1
        };
        request(url, data);
    });
	
	$("#_AddItem").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/package/_AddItem";

        var data = {
            itemId: 1,
            itemNum: 1,
			itemLevel: 1
        };
        request(url, data);
    });
	
	$("#arrange").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/package/arrange";

        var data = {
            
        };
        request(url, data);
    });
	
	$("#moveItem").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/package/moveItem";

        var data = {
            start: 1,
			end: 10
        };
        request(url, data);
    });
	
	$("#discardItem").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/package/discardItem";

        var data = {
            index: 1,
			itemId: ""
        };
        request(url, data);
    });

    $("#wearWeapon").bind("click", function() {
        var index = $("#index").val();//1
        var weaponId = $("#weaponId").val();//W01011
        var playerId = $("#playerId").val();

        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/equip/wearWeapon";

        var data = {
            index: index,
            weaponId: weaponId,
            playerId: playerId
        };
        request(url, data);
    });

    $("#unWearWeapon").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/equip/unWearWeapon";

        var weaponId = $("#weaponId").val();//W01011
        var playerId = $("#playerId").val();
        var data = {
            weaponId: weaponId,
            playerId: playerId
        };
        request(url, data);
    });


    $("#equip").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/equip/equip";

        var index = $("#index").val();//1
        var eqId = $("#eqId").val();//W01011
        var pkgType = $("#pkgType").val();//weapons
        var playerId = $("#playerId").val();
        var data = {
            index: index,
            eqId: eqId,
            //pkgType: pkgType,
            playerId: playerId
        };
        request(url, data);
    });

    $("#unEquip").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/equip/unEquip";

        var type = $("#type").val();//weapon armor
        var eqId = $("#eqId").val();//W01011 W901011
        var playerId = $("#playerId").val();
        var data = {
            eqId: eqId,
            type: type,
            playerId: playerId
        };
        request(url, data);
    });

    $("#upgrade").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/equip/upgrade";

        var type = $("#type").val();
        var eqId = $("#eqId").val();//W01011
        var playerId = $("#playerId").val();
        var data = {
            eqId: eqId,
            type: type,
            playerId: playerId
        };
        request(url, data);
    });
	
	$("#forgeUpgrade").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/equip/forgeUpgrade";

        var type = $("#type").val();
        var eqId = $("#eqId").val();//W01011
        var playerId = $("#playerId").val();
        var data = {
            eqId: eqId,
            type: type,
            playerId: playerId
        };
        request(url, data);
    });
	
	$("#inlay").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/equip/inlay";

        var type = $("#type").val();
        var eqId = $("#eqId").val();//W01011
        var playerId = $("#playerId").val();
		var index = $("#index").val();//1
		var cellId = $("#cellId").val();
		var diamondId = $("#diamondId").val();
        var data = {
            eqId: eqId,
            type: type,
            playerId: playerId,
			index: index,
			cellId: cellId,
			diamondId: diamondId
        };
        request(url, data);
    });
	
	$("#unInlay").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/equip/unInlay";

        var type = $("#type").val();
        var eqId = $("#eqId").val();//W01011
        var playerId = $("#playerId").val();
		var cellId = $("#cellId").val();
		var diamondId = $("#diamondId").val();
        var data = {
            eqId: eqId,
            type: type,
            playerId: playerId,
			cellId: cellId,
			diamondId: diamondId
        };
        request(url, data);
    });
	
	$("#changeDiamond").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/equip/changeDiamond";

        var type = $("#type").val();
        var eqId = $("#eqId").val();//W01011
        var playerId = $("#playerId").val();
		var diamonds = JSON.parse($("#diamonds").val());
        var data = {
            eqId: eqId,
            type: type,
            playerId: playerId,
			diamonds: JSON.stringify(diamonds)
        };
        request(url, data);
    });

    $("#getPartner").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/player/getPartner";

        var data = {
            cId: $("#cId").val()
        };
        request(url, data);
    });
	
	$("#gotoStage").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/partner/gotoStage";

        var data = {
            cId: $("#cId").val()
        };
        request(url, data);
    });
	
	$("#leaveTeam").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/partner/leaveTeam";

        var data = {
            cId: $("#cId").val()
        };
        request(url, data);
    });
	
	$("#aptitude_upgrade").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/aptitude/upgrade";

        var data = {
            type: $("#aptitudeType").val(),
			mtype: $("#mtype").val(),
			playerId: $("#aptitude_playerId").val()
        };
        request(url, data);
    });
	
	$("#checkFreeTime").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/aptitude/checkFreeTime";

        var data = {
            type: $("#aptitudeType").val(),
			mtype: $("#mtype").val(),
			playerId: $("#aptitude_playerId").val()
        };
        request(url, data);
    });
	
	$("#checkAllFreeTime").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/aptitude/checkAllFreeTime";

        var data = {
            
        };
        request(url, data);
    });
	
	$("#ghost_upgrade").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/ghost/upgrade";

        var data = {
			playerId: $("#aptitude_playerId").val()
        };
        request(url, data);
    });
	
	$("#getMiscs").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/misc/getMiscs";

        var data = {
			
        };
        request(url, data);
    });
	
	$("#extraction").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/altar/extraction";

        var data = {
			altarId: $("#altarId").val()
        };
        request(url, data);
    });
	
	$("#exchange").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/altar/exchange";

        var data = {
			heroId: $("#heroId").val()
        };
        request(url, data);
    });
	
	$("#fusion").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/soul/fusion";

        var data = {
			playerId: $("#fusion_playerId").val(),
			souls: $("#souls").val()
        };
        request(url, data);
    });
	
	$("#fusionWithHeroId").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/soul/fusionWithHeroId";

        var data = {
			playerId: $("#fusion_playerId").val(),
			souls: $("#souls").val()
        };
        request(url, data);
    });

    $("#startTask").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/task/startTask";

        var data = {
            taskId: $("#taskId").val()
        };
        request(url, data);
    });

    $("#handOverTask").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/task/handOverTask";

        var data = {
            taskId: $("#taskId").val()
        };
        request(url, data);
    });

    $("#learnSkill").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/skill/learnSkill";

        var data = {
            skillId: $("#skillId").val()
        };
        request(url, data);
    });

    $("#upgradeSkill").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/skill/upgradeSkill";

        var data = {
            skillId: $("#skillId").val()
        };
        request(url, data);
    });

    $("#useSkill").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/skill/useSkill";

        var data = {
            skillId: $("#skillId").val()
        };
        request(url, data);
    });
	
	$("#learnAndUpgradeSkill").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/skill/learnAndUpgradeSkill";

        var data = {
			type: $("#skillType").val(),
            skillId: $("#skillId").val(),
			playerId: $("#skillPlayerId").val()
        };
        request(url, data);
    });
	
	$("#forgetSkill").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/skill/forgetSkill";

        var data = {
			type: $("#skillType").val(),
            skillId: $("#skillId").val(),
			playerId: $("#skillPlayerId").val()
        };
        request(url, data);
    });

    $("#resetTask").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/gm/resetTask";

        var data = {
            //type: 1,
            type: "currentMainTask",
            //taskId: "Task10102",
            taskId: "Task10101",
            nickname: "html5"
        };
        request(url, data);
    });

    $("#updateMoney").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/gm/updateMoney";

        var data = {
            nickname: $("#gm_nickname").val(),
            money: $("#gm_money").val()
        };
        request(url, data);
    });
	
	$("#updateGameCurrency").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/gm/updateGold";

        var data = {
            nickname: $("#gm_nickname").val(),
            gameCurrency: $("#gm_money").val()
        };
        request(url, data);
    });

    $("#updateExp").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/gm/updateExp";

        var data = {
            nickname: $("#gm_nickname").val(),
            exp: $("#gm_exp").val()
        };
        request(url, data);
    });
	
	$("#clearPackage").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/gm/clearPackage";

        var data = {
            nickname: $("#gm_nickname").val()
        };
        request(url, data);
    });
	
	$("#initTasks").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/gm/initTasks";

        var data = {
            nickname: $("#gm_nickname").val()
        };
        request(url, data);
    });
	
	$("#initForgeForEquipment").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/gm/initForgeForEquipment";

        var data = {
            nickname: $("#gm_nickname").val()
        };
        request(url, data);
    });

    $("#addMessage").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/message/addMessage";

        var data = {
            type: 1,
            message: "test"
        };
        request(url, data);
    });

    $("#getMessage").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/message/getMessage";

        var data = {

        };
        request(url, data);
    });

    $("#removeMessage").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/message/removeMessage";

        var data = {

        };
        request(url, data);
    });

    $("#addTipMessage").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/message/addTipMessage";

        var data = {
            type: "email",
            num: 1
        };
        request(url, data);
    });

    $("#getTipMessage").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/message/getTipMessage";

        var data = {

        };
        request(url, data);
    });

    $("#removeTipMessage").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/message/removeTipMessage";

        var data = {

        };
        request(url, data);
    });

    $("#addBattleReport").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/message/addBattleReport";

        var data = {
            battleInfo: JSON.stringify({battle: ""})
        };
        request(url, data);
    });

    $("#getBattleReport").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/message/getBattleReport";

        var data = {

        };
        request(url, data);
    });

    $("#removeBattleReport").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/message/removeBattleReport";

        var data = {

        };
        request(url, data);
    });

    $("#publishMessage").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/message/publishMessage";

        var data = {

        };
        request(url, data);
    });
});

function request(url, data) {
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
        }
    });
}