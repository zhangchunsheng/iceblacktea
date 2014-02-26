/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-10-12
 * Description: scene
 */
$(document).ready(function() {
    /**
     * 写入redis
     */
    $("#writeRedis").click(function() {
        var that = this;
        var serverId = $("#serverId").val();
        var cityId = $("#cityId").val();
        $.ajax({
            type: "post",
            data: {
                serverId: serverId,
                cityId: cityId
            },
            url: '/index/scene/writeRedis',
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
});