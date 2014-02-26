/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-07-11
 * Description: utils
 */
var fs = require("fs");
var path = require('path');
var Buffer = require('buffer').Buffer;
var constants = require('constants');

var utils = {

};

utils.read = function(filename, next) {
    fs.open(filename, 'r', function(status, fd) {
        if (status) {
            console.log(status.message);
            return;
        }
        var buffer = new Buffer(100);
        fs.read(fd, buffer, 0, 100, 0, function(err, num) {
            console.log(buffer.toString('utf-8', 0, num));
        });
    });
}

utils.readFile = function(filename, next) {
    fs.readFile(filename, function(err, data) {
        if(err)
            throw err;
        var array = data.toString().split("\r\n");
        next(array);
    });
}

utils.writeJSONFile = function(data, filename, next) {
    console.log("export");
    __parentDir = path.dirname(process.mainModule.filename);
    var stream = fs.createWriteStream(__parentDir + '/export/' + filename + '.json', {
        encoding: 'utf8'
    });

    stream.write("[\n");

    var str = "";
    str = "\t[";
    for(var i in data[0]) {
        if(typeof data[0][i] == "function")//"number" "string" "boolean" "object" null "undefined" "function"
            continue;
        if(i == "date" || i == "bz" || i == "updateBz") {
            continue;
        }
        str += "\"" +  i + "\",";
    }
    str = str.substr(0, str.length - 1);
    str += "],\n";
    stream.write(str);

    str = "\t["
    for(var i in data[0]) {
        if(typeof data[0][i] == "function")
            continue;
        if(i == "date" || i == "bz" || i == "updateBz") {
            continue;
        }
        str += "\"" +  i + "\",";
    }
    str = str.substr(0, str.length - 1);
    str += "],\n";
    stream.write(str);

    for(var i = 0 ; i < data.length ; i++) {
        str = "\t[";
        for(var j in data[i]) {
            if(typeof data[i][j] == "function")
                continue;
            if(j == "date" || j == "bz" || j == "updateBz") {
                continue;
            }
            if(typeof data[i][j] == "number") {
                str += data[i][j] + ",";
            } else if(data[i][j].indexOf("[") >= 0 || data[i][j].indexOf("{") >= 0) {
                str += "" + data[i][j] + ",";
            } else {
                str += "\"" + data[i][j] + "\",";
            }
        }
        str = str.substr(0, str.length - 1);
        if(i == data.length - 1) {
            str += "]\n";
        } else {
            str += "],\n";
        }
        stream.write(str);
    }

    stream.write("]");
    stream.end();

    next(data);
}

utils.writeJSONWithIdFile = function(data, filename, next) {
    console.log("export");
    __parentDir = path.dirname(process.mainModule.filename);
    var stream = fs.createWriteStream(__parentDir + '/export/' + filename + '.json', {
        encoding: 'utf8'
    });

    var id = 0;
    var lastId = 0;

    var str = "";
    str = "{\n";
    stream.write(str);

    for(var i = 0 ; i < data.length ; i++) {
        id = data[i].id;
        if(id == lastId) {
            str = "";
            str += "\t}, {\n";
        } else {
            str = "";
            if(i != 0) {
                if(i == data.length - 1) {
                    str += "\t}]\n";
                } else {
                    str += "\t}],\n";
                }
            }
            str += "\t\"" + data[i].id + "\": [{\n";
            lastId = id;
        }

        for(var j in data[i]) {
            if(typeof data[i][j] == "function")
                continue;
            if(j == "date" || j == "bz" || j == "updateBz") {
                continue;
            }
            if(typeof data[i][j] == "number") {
                str += "\t\t\"" + j + "\": " + data[i][j] + "";
            } else if(data[i][j].indexOf("[") >= 0 || data[i][j].indexOf("{") >= 0) {
                str += "\t\t\"" + j + "\": " + data[i][j] + "";
            } else {
                str += "\t\t\"" + j + "\": " + "\"" + data[i][j] + "\"";
            }
            if(j == "id") {
                str += "\n";
            } else {
                str += ",\n";
            }
        }

        stream.write(str);
    }

    stream.write("\t}]\n}");
    stream.end();

    next(data);
}

utils.writeJSONArrayFile = function(data, filename, next) {
    console.log("export");
    __parentDir = path.dirname(process.mainModule.filename);
    var stream = fs.createWriteStream(__parentDir + '/exportJson/' + filename + '.json', {
        encoding: 'utf8'
    });

    stream.write("{\n");

    var str = "\t\"title\": ["
    for(var i in data[0]) {
        if(typeof data[0][i] == "function")
            continue;
        str += "\"" +  i + "\",";
    }
    str = str.substr(0, str.length - 1);
    str += "],\n";
    stream.write(str);

    str = "";

    for(var i = 0 ; i < data.length ; i++) {
        console.log(i);
        str = "";
        str += "\t\"" + data[i]["id"] + "\": [";
        for(var j in data[i]) {
            if(typeof data[i][j] == "function")
                continue;

            if(typeof data[i][j] == "number") {
                str += data[i][j] + ",";
            } else if(data[i][j].indexOf("[") >= 0 || data[i][j].indexOf("{") >= 0) {
                str += "" + data[i][j] + ",";
            } else {
                str += "\"" + data[i][j] + "\",";

            }
        }
        str = str.substr(0, str.length - 1);

        if(i == data.length - 1) {
            str += "]\n";
        } else {
            str += "],\n";
        }
        stream.write(str);
    }

    stream.write("}");
    stream.end();

    next(data);
}

utils.writeJSONObjectFile = function(data, filename, next) {
    console.log("export");
    __parentDir = path.dirname(process.mainModule.filename);
    var stream = fs.createWriteStream(__parentDir + '/exportJson/' + filename + '.json', {
        encoding: 'utf8'
    });

    stream.write("{\n");

    var str = "";

    for(var i = 0 ; i < data.length ; i++) {
        console.log(i);
        str = "";
        str += "\t\"" + data[i]["id"] + "\": {";
        for(var j in data[i]) {
            if(typeof data[i][j] == "function")
                continue;

            str += "\n\t\t";
            if(typeof data[i][j] == "number") {
                str += "\"" + j + "\": " + data[i][j] + ",";
            } else if(data[i][j].indexOf("[") >= 0 || data[i][j].indexOf("{") >= 0) {
                str += "\"" + j + "\": " + "" + data[i][j] + ",";
            } else {
                str += "\"" + j + "\": " + "\"" + data[i][j] + "\",";

            }
        }
        str = str.substr(0, str.length - 1);

        if(i == data.length - 1) {
            str += "\n\t}\n";
        } else {
            str += "\n\t},\n";
        }
        stream.write(str);
    }

    stream.write("}");
    stream.end();

    next(data);
}

utils.writeArray = function(data, columns, filename, next) {
    console.log("export");
    __parentDir = path.dirname(process.mainModule.filename);
    var stream = fs.createWriteStream(__parentDir + '/export/' + filename + '.json', {
        encoding: 'utf8'
    });

    stream.write("[");

    var str = "";
    if(columns.length == 1) {
        for(var i = 0 ; i < data.length ; i++) {
            if(i == data.length - 1) {
                str = "\"" + data[i][columns[0]] + "\"";
            } else {
                str = "\"" + data[i][columns[0]] + "\",";
            }
            stream.write(str);
        }
    } else {

    }

    stream.write("]");
    stream.end();

    next(data);
}

utils.writeLine = function(filename, data, next) {
    __parentDir = path.dirname(process.mainModule.filename);
    /*fs.writeFile(__parentDir + '/db/' + filename + '.sql', data, {
        encoding: 'utf8',
        flags: 'a+'
    }, next);*/
    /*fs.writeFileSync(__parentDir + '/db/' + filename + '.sql', data, {
        encoding: 'utf8',
        flags: 'a+'
    });
    next();*/

    var stream = fs.createWriteStream(__parentDir + '/db/' + filename + '.sql', {
        encoding: 'utf8'
    });

    stream.write(data);
    stream.end();

    next();
}

utils.readLines = function(input, func) {
    var remaining = '';

    input.on('data', function(data) {
        remaining += data;
        var index = remaining.indexOf('\n');
        while (index > -1) {
            var line = remaining.substring(0, index);
            remaining = remaining.substring(index + 1);
            func(line);
            index = remaining.indexOf('\n');
        }
    });

    input.on('end', function() {
        if (remaining.length > 0) {
            func(remaining);
        }
    });
}

utils.readdir = function(pathName, next) {
    __parentDir = path.dirname(process.mainModule.filename);
    pathName = __parentDir + "/" + pathName;
    fs.readdir(pathName, function(err, files) {
        console.log(files);
        next(files);
    })
}

utils.getObjId = function(id) {
    if(id == null || id == "")
        id = 0;
    return id;
}

utils.getItem = function(items, id) {
    for(var i = 0, l=items.length ; i < l ; i++) {
        if(items[i].id == id) {
            return items[i]
        }
    }
    return null;
}

function func(data) {
    console.log('Line: ' + data);
}

/**
 * yyyy-MM-dd
 * @param date
 */
utils.getDaytime = function(date) {
    var month = date.getMonth();
    month = month + 1;
    if(month < 10) {
        month = "0" + month;
    }
    var day = date.getDate();
    if(day < 10) {
        day = "0" + day;
    }
    return date.getFullYear() + "-" + month + "-" + day;
}

//var input = fs.createReadStream('lines.txt');
//readLines(input, func);

module.exports = utils;