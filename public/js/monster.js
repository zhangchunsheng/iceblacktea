/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-07-10
 * Description: monster
 */
var selectMonsterId;
$(document).ready(function() {
    $("div .hero").click(function() {
        selectMonsterId = $(this).children().attr("id");
        var monster = utils.getItem(monsters, selectMonsterId);
        var template = $("#monsterTemplate").html();
        $("#monster").html(_.template(template, {
            monster: monster
        }));
        $("#saveAttr").on("click", function() {
            var monster = {
                id: selectMonsterId
            }
            var _monster = utils.getItem(monsters, selectMonsterId);
            for(var o in _monster) {
                if(o == "id") {
                    continue;
                } else {
                    monster[o] = $("#" + o).val();
                }
            }
            monster = JSON.stringify(monster);
            console.log(monster);
            var that = this;
            $.ajax({
                type: "post",
                url: 'monster/' + selectMonsterId,
                data: {monster: monster},
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
            url: 'monsters/import',
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
            url: 'monsters/export',
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
            url: 'monsters/exportJson',
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