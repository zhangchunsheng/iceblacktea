
/*
 * GET home page.
 */
var utils = require('../app/utils/utils');
var dataApi = require('../app/utils/dataApi');

exports.index = function(req, res) {
    var menus = dataApi.menus.getArray();
    var submenus = dataApi.menus.findById("index").menus;
    res.render('index', {
        id: "index",
        title: '首页',
        session: req.session,
        menus: menus,
        submenus: submenus
    });
};

exports.data = function(req, res) {
    var menus = dataApi.menus.getArray();
    var submenus = dataApi.menus.findById("data").menus;
    res.render('index', {
        id: "data",
        title: '数值维护',
        session: req.session,
        menus: menus,
        submenus: submenus
    });
};

exports.about = function(req, res) {
    var menus = dataApi.menus.getArray();
    var submenus = dataApi.menus.findById("about").menus;
    res.render('index', {
        id: "about",
        title: '关于',
        session: req.session,
        menus: menus,
        submenus: submenus
    });
};

exports.character = function(req, res) {
    res.render('index/character', {
        title: '角色管理'
    });
};

exports.export = function(req, res) {
    utils.readdir("export", function(files) {
        console.log(files);
        str = "";
        for(var i = 0 ; i < files.length ; i++) {
            str += '<a href="/export/' + files[i] + '">' + files[i] + '</a><br />';
        }
        res.send(str);
    })
}