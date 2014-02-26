/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-07-04
 * Description: serverList
 */
var serverId;
$(document).ready(function() {
    $("div .list").click(function() {
        serverId = $(this).children().attr("id");
        var server = utils.getItem(serverList, serverId);
        var template = $("#serverTemplate").html();
        $("#server").html(_.template(template, {server:server}));
        $("#saveAttr").on("click", function() {
            var server = {
                id: serverId,
                name: $("#name").val(),
                showName: $('#showName').val(),
                ip: $("#ip").val(),
                port: $("#port").val(),
                connectNumber: $("#connectNumber").val(),
                connectors: $("#connectors").val(),
                bz: $("#bz").val()
            }
            server = JSON.stringify(server);
            console.log(server);
            var that = this;
            $.ajax({
                type: "post",
                url: 'serverList/' + serverId,
                data: {server: server},
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

    $("#export").click(function() {
        var that = this;
        $.ajax({
            type: "post",
            url: 'serverLists/export',
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