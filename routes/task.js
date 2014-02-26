/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-07-08
 * Description: task
 */
var taskService = require('../app/services/TaskService');
var syncDataService = require('../app/services/SyncDataService');

exports.index = function(req, res) {
    var taskList = [];
    taskService.getTaskList(function(data) {
        taskList = data;
        console.log(taskList);
        res.render('task', {
            title: 'task',
            taskList: JSON.stringify(taskList)
        });
    });
};

exports.update = function(req, res) {
    var id = req.params.id;
    var task = req.body.task;
    task = JSON.parse(task);
    taskService.update(task, function(data) {
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
};

/**
 * import
 * @param req
 * @param res
 */
exports.import = function(req, res) {
    taskService.import(function() {
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}

/**
 * export
 * @param req
 * @param res
 */
exports.export = function(req, res) {
    taskService.export(function() {
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}

exports.exportJson = function(req, res) {
    taskService.exportJson(function() {
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}

/**
 * export
 * @param req
 * @param res
 */
exports.writeToRedis = function(req, res) {
    syncDataService.initTaskList(function() {
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}