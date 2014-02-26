/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-07-13
 * Description: upload
 */
var path = require('path'),
    fs = require('fs');

exports.index = function(req, res) {
    res.render('upload files', {
        title: 'upload files'
    });
}

exports.upload = function(req, res) {
    console.log(req.files);
    var filepath;
    if (req.files.jsonfile && req.files.jsonfile.size) {
        processScreenshot(req.files.jsonfile, function(err, data) {
            if(err) {
                var result = {
                    result: 0,
                    message: data.message
                };
                res.send(JSON.stringify(result));
            } else {
                var result = {
                    result: 1
                };
                res.send(JSON.stringify(result));
            }
        });
    } else {
        var result = {
            result: 0,
            message: "上传文件出错"
        };
        res.send(JSON.stringify(result));
    }
}

var processScreenshot = function (screenshot, next) {
    var tempPath = screenshot.path,
        targetPath = path.resolve('./public/upload/' + screenshot.name);
    if (path.extname(screenshot.name).toLowerCase() === '.csv') {
        fs.rename(tempPath, targetPath, function(err) {
            if (err) {
                console.log(err);
                next(err, {
                    message: "can't rename file"
                });
            } else {
                console.log("upload completed!");
                next(null, {
                    path: targetPath
                });
            }
        });
    } else {
        fs.unlink(tempPath, function(err) {
            if (err) {
                console.log(err);
            }
            console.error("only .csv files are allowed!");
            next(-1, {
                message: "only .csv files are allowed!"
            });
        });
    }
};