/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-09-18
 * Description: object
 */
var selectId;
$(document).ready(function() {
    $("div .hero").click(function() {
        selectId = $(this).children().attr("id");
        var object = utils.getItem(objects, selectId);
        var template = $("#objectTemplate").html();
        $("#object").html(_.template(template, {
            object: object
        }));
        $("#saveAttr").on("click", function() {
            var object = {
                id: selectId
            }
            var _object = utils.getItem(objects, selectId);
            for(var o in _object) {
                if(o == "id") {
                    continue;
                } else {
                    object[o] = $("#" + o).val();
                }
            }
            object = JSON.stringify(object);
            console.log(object);
            var that = this;
            $.ajax({
                type: "post",
                url: saveRoute + '/' + selectId,
                data: {object: object},
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

    $("#import").click(function() {
        var that = this;
        $.ajax({
            type: "post",
            url: exportRoute + '/import',
            success: function(data, status) {
                var data = JSON.parse(data);
                if(data.result == 1) {
                    utils.alert(that, "导入成功！");
                    window.location.reload();
                } else {
                    utils.alert(that, "导入失败！");
                }
            }
        });
        return false;
    });

    $("#export").click(function() {
        var that = this;
        $.ajax({
            type: "post",
            url: exportRoute + '/export',
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

    $("#exportJson").click(function() {
        var that = this;
        $.ajax({
            type: "post",
            url: exportRoute + '/exportJson',
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