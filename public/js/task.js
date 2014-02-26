/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-07-08
 * Description: task
 */
var selectTaskId;
$(document).ready(function() {
    $("div .hero").click(function() {
        selectTaskId = $(this).children().attr("id");
        var task = utils.getItem(taskList, selectTaskId);
        var template = $("#taskTemplate").html();
        $("#task").html(_.template(template, {
            task: task,
            taskType: taskType
        }));
        $("select[name='tasktype']").selectpicker({style: 'btn-primary', menuStyle: 'dropdown-inverse'});
        $("#saveAttr").on("click", function() {
            var task = {
                id: selectTaskId,
                type: $("#tasktype").val()
            }
            var _task = utils.getItem(taskList, selectTaskId);
            for(var o in _task) {
                if(o == "id" || o == "type") {
                    continue;
                } else {
                    task[o] = $("#" + o).val();
                }
            }
            task = JSON.stringify(task);
            console.log(task);
            var that = this;
            $.ajax({
                type: "post",
                url: 'task/' + selectTaskId,
                data: {task: task},
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
            url: 'taskList/import',
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
            url: 'taskList/export',
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
            url: 'taskList/exportJson',
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

    $("#writeToRedis").click(function() {
        var that = this;
        $.ajax({
            type: "post",
            url: 'taskList/writeToRedis',
            success: function(data, status) {
                var data = JSON.parse(data);
                if(data.result == 1) {
                    utils.alert(that, "写入redis成功！");
                } else {
                    utils.alert(that, "写入redis失败！");
                }
            }
        });
        return false;
    });
});