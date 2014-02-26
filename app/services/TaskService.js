/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-07-08
 * Description: TaskService
 */
var taskDao = require('../dao/TaskDao');
var utils = require('../utils/utils');

var TaskService = function() {

}

TaskService.prototype.getTaskList = function(next) {
    taskDao.getTaskList(next);
}

TaskService.prototype.update = function(task, next) {
    taskDao.update(task, next);
}

/**
 * 导入数据
 * @param next
 */
TaskService.prototype.import = function(next) {
    taskDao.truncate(function(result) {
        utils.readFile("app/config/data/task.txt", function(data) {
            data.shift();
            insertData(data, next);
        });
    });
}

function insertData(data, next) {
    if(data.length == 0) {
        next({});
        return;
    }
    var rows = [];
    var task = {};
    var taskId = "";
    var type = 1;
    var questNpcId = "";
    var completeNpcId = "";
    var taskProp = 0;
    var goalType = 0;
    var goalItemId = 0;
    var goalItemNum = 0;
    var getExp = 0;
    var getMoney = 0;
    var rewardName = "";
    var rewardItems = "";
    var isBroadcast = 0;
    var nextTaskId = "";
    var showNpcId = "";
    var hideNpcId = "";

    var taskGoal = {};

    var row = data.shift();

    rows = row.split(",");
    if(row.indexOf(",") < 0) {
        insertData(data, next);
    }

    taskId = rows[0] == "" ? "" : rows[0];
    type = taskId.substr(4, 1);

    taskGoal = {
        type: rows[4] == "" ? 0 : rows[4],
        itemId: rows[5] == "" ? "" : rows[5],
        itemNum: rows[6] == "" ? "" : rows[6]
    }

    task = {
        taskId: taskId,
        type: type,
        questNpcId: rows[1] == "" ? "" : rows[1],
        completeNpcId: rows[2] == "" ? "" : rows[2],
        taskProp: rows[3] == "" ? "" : rows[3],
        taskGoal: JSON.stringify(taskGoal),
        getExp: rows[7] == "" ? 0 : rows[7],
        getMoney: rows[8] == "" ? 0 : rows[8],
        rewardName: rows[9] == "" ? "" : rows[9],
        rewardItems: rows[10] == "" ? "" : rows[10],
        isBroadcast: rows[11] == "" ? 0 : rows[11],
        nextTaskId: rows[12] == "" ? "" : rows[12],
        showNpcId: rows[13] == "" ? "" : rows[13],
        hideNpcId: rows[14] == "" ? "" : rows[14]
    };
    taskDao.insert(task, function() {
        insertData(data, next);
    });
}

/**
 * 导出数据
 * @param next
 */
TaskService.prototype.export = function(next) {
    this.getTaskList(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].taskId;
        }
        utils.writeJSONFile(data, "task", next);
    });
}

TaskService.prototype.exportJson = function(next) {
    this.getTaskList(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].taskId;
        }
        utils.writeJSONArrayFile(data, "task", next);
    });
}

module.exports = new TaskService();