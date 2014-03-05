/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2014-01-14
 * Description: scene
 */
$(document).ready(function() {
    $("#clearPackage").click(function() {
        var that = this;

        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/gm/clearPackage";

        var nickname = $("#nickname").val();
        var data = {
            nickname: nickname
        };
        request(url, data, that);
        return false;
    });

    $("#initTasks").click(function() {
        var that = this;

        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/gm/initTasks";

        var nickname = $("#nickname").val();
        var data = {
            nickname: nickname
        };
        request(url, data, that);
        return false;
    });
});

function request(url, data, obj) {
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
            if(data.code == 200) {
                utils.alert(obj, "执行成功！");
            } else {
                utils.alert(obj, "执行失败！");
            }
        }
    });
}