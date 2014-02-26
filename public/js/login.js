/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-06-24
 * Description: login
 */
$(document).ready(function() {
    $("#login").bind("click", function(e) {
        var loginName = $("#login-name").val();
        var password = $("#login-pass").val();
        if(utils.isEmpty(loginName)) {
            $("#tips").text("请输入用户名");
            return;
        }
        if(utils.isEmpty(password)) {
            $("#tips").text("请输入密码");
            return;
        }
        $.ajax({
            type: "post",
            url: "login/" + loginName + "/" + password,
            success: function(data, status) {
                data = JSON.parse(data);
                if(data.result == 0) {
                    $("#tips").text("用户名或密码不正确");
                } else {
                    window.location.href = "index";
                }
            }
        });
    });
});