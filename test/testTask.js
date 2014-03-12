/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2014-03-11
 * Description: testTask
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

var taskId = "Task10101";

$(document).ready(function() {
    $("#enterGame").bind("click", function() {
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
                $("#content").append("欢迎" + JSON.parse(data).player.nickname + "<br/>");
                console.log(JSON.parse(data));
            }
        });
    });

    $("#resetTask").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/gm/initTasks";

        var data = {
            nickname: "test"
        };
        request(url, data);
    });

    $("#startTask").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/task/startTask";

        var data = {
            taskId: taskId
        };
        taskId = data.taskId;
        startTask(url, data);
    });

    $("#enterIndu").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/player/enterIndu";

        var data = {
            induId: "Ins10101"
        };
        request(url, data);
    });

    $("#triggerEvent1").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/indu/triggerEvent";

        var data = {
            eid: "MG101011"
        };
        requestTriggerEvent(url, data);
    });

    $("#triggerEvent2").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/indu/triggerEvent";

        var data = {
            eid: "MG101012"
        };
        requestTriggerEvent(url, data);
    });

    $("#triggerEvent3").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/indu/triggerEvent";

        var data = {
            eid: "MG101013"
        };
        requestTriggerEvent(url, data);
    });

    $("#buyItem1").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/shop/buyItem";

        var data = {
            itemId: "D110101",
            npcId: "SH11",
            index: 0
        };
        requestTriggerEvent(url, data);
    });

    $("#buyItem2").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/shop/buyItem";

        var data = {
            itemId: "D110102",
            npcId: "SH11",
            index: 1
        };
        requestTriggerEvent(url, data);
    });

    $("#handOverTask").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/task/handOverTask";

        var data = {
            taskId: taskId
        };
        handOverTask(url, data);
    });

    $("#clearScreen").bind("click", function() {
        $("#content").html("");
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
            $("#content").append(JSON.stringify(data) + "<br/>");
            console.log(data);
        }
    });
}

var taskStatus = {
    1: "已接",
    2: "未完成",
    4: "已完成",
    5: "已交"
};
function requestTriggerEvent(url, data) {
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
            if(data.pushMessage) {
                var task = data.pushMessage[0].data;
                $("#content").append("任务状态：" + taskStatus[task.status] + "，任务进度：" + task.taskRecord.itemNum + "/" + task.taskGoal.itemNum + "<br/>");
            }
        }
    });
}

function startTask(url, data) {
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
            $("#content").append("接任务：" + JSON.stringify(data) + "<br/>");
            console.log(data);
            if(data.pushMessage) {
                var task = data.pushMessage[0].data;
                $("#content").append("任务状态：" + taskStatus[task.status] + "，任务进度：" + task.taskRecord.itemNum + "/" + task.taskGoal.itemNum + "<br/>");
            }
        }
    });
}

function handOverTask(url, data) {
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
            var nextTasks = data.nextTasks;
            taskId = nextTasks.currentMainTask.id;
            $("#content").append("交任务完成，下一任务：" + JSON.stringify(nextTasks["currentMainTask"]) + "，奖励：" + JSON.stringify(data.getItems) + "<br/>");
        }
    });
}