/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-07-11
 * Description: instancedungeon
 */
var selectInstancedungeonId;
$(document).ready(function() {
    $("div .hero").click(function() {
        selectInstancedungeonId = $(this).children().attr("id");
        var instancedungeon = utils.getItem(instancedungeons, selectInstancedungeonId);
        var template = $("#instancedungeonTemplate").html();
        $("#instancedungeon").html(_.template(template, {
            instancedungeon: instancedungeon
        }));
        $("#saveAttr").on("click", function() {
            var instancedungeon = {
                id: selectInstancedungeonId
            }
            var _instancedungeon = utils.getItem(instancedungeons, selectInstancedungeonId);
            for(var o in _instancedungeon) {
                if(o == "id") {
                    continue;
                } else {
                    instancedungeon[o] = $("#" + o).val();
                }
            }
            instancedungeon = JSON.stringify(instancedungeon);
            console.log(instancedungeon);
            var that = this;
            $.ajax({
                type: "post",
                url: 'indu/' + selectInstancedungeonId,
                data: {instancedungeon: instancedungeon},
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
            url: 'indus/import',
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
            url: 'indus/export',
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
            url: 'indus/exportJson',
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