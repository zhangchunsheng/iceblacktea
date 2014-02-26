/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-07-15
 * Description: partner
 */
var selectId;
$(document).ready(function() {
    $("div .hero").click(function() {
        selectId = $(this).children().attr("id");
        var partner = utils.getItem(partners, selectId);
        var template = $("#partnerTemplate").html();
        $("#partner").html(_.template(template, {
            partner: partner
        }));
        $("#saveAttr").on("click", function() {
            var partner = {
                id: selectId
            }
            var _partner = utils.getItem(partners, selectId);
            for(var o in _partner) {
                if(o == "id") {
                    continue;
                } else {
                    partner[o] = $("#" + o).val();
                }
            }
            partner = JSON.stringify(partner);
            console.log(partner);
            var that = this;
            $.ajax({
                type: "post",
                url: 'partner/' + selectId,
                data: {partner: partner},
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
            url: 'partners/export',
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