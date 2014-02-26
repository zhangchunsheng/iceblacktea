/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-06-24
 * Description: utils
 */
var utils = {

};

utils.isEmpty = function(value) {
    if(typeof value == "undefined" || value.trim() == "") {
        return true;
    }
    return false;
}

utils.alert = function(obj, info) {
    var template = $("#alertTemplate").html();
    $("#alert").html(_.template(template, {info:info}));
    var offset = $(obj).offset();
    $("#alert").css("left", offset.left + "px");
    $("#alert").css("top", offset.top + "px");
    //$("#alert").css("width", $(obj).width() + "px");
    $("#alert").show();
    $('#alert').bind('closed', function () {
        $("#alert").hide();
    });
    $(".alert").alert();
}

utils.getItem = function(items, id) {
    for(var i = 0, l=items.length ; i < l ; i++) {
        if(items[i].id == id) {
            return items[i]
        }
    }
    return null;
}