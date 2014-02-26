/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2014-01-14
 * Description: gm
 */
exports.index = function(req, res) {
    res.render('gm/gm', {
        title: 'GM命令'
    });
}