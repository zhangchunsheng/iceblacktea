/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-06-24
 * Description: indu_monstergroup
 */
var selectMonstergroupId;
$(document).ready(function() {
    $("div .hero").click(function() {
        selectMonstergroupId = $(this).children().attr("id");
        var monstergroup = utils.getItem(monstergroups, selectMonstergroupId);
        var template = $("#monstergroupTemplate").html();
        $("#monstergroup").html(_.template(template, {
            monstergroup: monstergroup
        }));
        $("#saveAttr").on("click", function() {
            var monstergroup = {
                id: selectMonstergroupId
            }
            var _monstergroup = utils.getItem(monstergroups, selectMonstergroupId);
            for(var o in _monstergroup) {
                if(o == "id") {
                    continue;
                } else {
                    monstergroup[o] = $("#" + o).val();
                }
            }
            monstergroup = JSON.stringify(monstergroup);
            console.log(monstergroup);
            var that = this;
            $.ajax({
                type: "post",
                url: 'indu_monstergroup/' + selectMonstergroupId,
                data: {monstergroup: monstergroup},
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
            url: 'indu_monstergroups/import',
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
            url: 'indu_monstergroups/export',
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
            url: 'indu_monstergroups/exportJson',
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