/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-08-22
 * Description: character
 */
$(document).ready(function() {

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
        url: '/character/readRedis',
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
        url: '/character/writeRedis',
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