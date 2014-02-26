/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-06-24
 * Description: login
 */
var userService = require('../app/services/UserService')
    , session = require('../app/session');
exports.index = function(req, res) {
    res.render('login', { title: '登录' });
}

exports.login = function(req, res) {
    var loginName = req.params.loginName;
    var password = req.params.password;
    userService.login(loginName, password, function(data) {
        if(data.length == 0) {
            var result = {
                result: 0
            };
            res.send(JSON.stringify(result));
        } else {
            var result = {
                result: 1
            };
            session.setSession(req, res, data[0]);
            console.log(req.session);
            res.send(JSON.stringify(result));
        }
    });
}

exports.logout = function(req, res) {
    session.clearSession(req, res, function(err) {
        if(err) {
            console.log(err);
        }
        res.redirect("/login");
    });
}