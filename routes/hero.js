/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-06-24
 * Description: hero
 */
var heroService = require('../app/services/HeroService')
    , fs = require('fs')
    , path = require('path');

exports.index = function(req, res) {
    var heros = [];
    heroService.getAllHeros(function(data) {
        heros = data;
        console.log(heros);
        res.render('hero', {
            title: 'calculate hero attribute',
            heros: JSON.stringify(heros)
        });
    });
}

exports.export = function(req, res) {
    console.log("export");
    __parentDir = path.dirname(process.mainModule.filename);
    heroService.getAllHeros(function(data) {
        heros = data;
        var stream = fs.createWriteStream(__parentDir + '/export/heros.json', {
            encoding: 'utf8'
        });

        stream.write("[\n");

        var str = "";
        str = "\t[";
        for(var i in heros[0]) {
            if(typeof heros[0][i] == "function")//"number" "string" "boolean" "object" null "undefined" "function"
                continue;
            str += "\"" +  i + "\",";
        }
        str = str.substr(0, str.length - 1);
        str += "],\n";
        stream.write(str);

        str = "\t["
        for(var i in heros[0]) {
            if(typeof heros[0][i] == "function")
                continue;
            str += "\"" +  i + "\",";
        }
        str = str.substr(0, str.length - 1);
        str += "],\n";
        stream.write(str);

        for(var i = 0 ; i < heros.length ; i++) {
            str = "\t[";
            for(var j in heros[i]) {
                if(typeof heros[i][j] == "function")
                    continue;
                if(typeof heros[i][j] == "number") {
                    str += heros[i][j] + ",";
                } else {
                    str += "\"" + heros[i][j] + "\",";
                }
            }
            str = str.substr(0, str.length - 1);
            if(i == heros.length - 1) {
                str += "]\n";
            } else {
                str += "],\n";
            }
            stream.write(str);
        }

        stream.write("]");
        stream.end();

        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}

exports.exportJson = function(req, res) {
    console.log("export");
    __parentDir = path.dirname(process.mainModule.filename);
    heroService.getAllHeros(function(data) {
        var heros = data;
        var stream = fs.createWriteStream(__parentDir + '/exportJson/heros.json', {
            encoding: 'utf8'
        });

        stream.write("{\n");

        var str = "\t\"title\": ["
        for(var i in heros[0]) {
            if(typeof heros[0][i] == "function")
                continue;
            str += "\"" +  i + "\",";
        }
        str = str.substr(0, str.length - 1);
        str += "],\n";
        stream.write(str);

        str = "";

        for(var i = 0 ; i < heros.length ; i++) {
            console.log(i);
            str = "";
            str += "\t\"" + heros[i]["id"] + "\": [";
            for(var j in heros[i]) {
                if(typeof heros[i][j] == "function")
                    continue;

                if(typeof heros[i][j] == "number") {
                    str += "" + heros[i][j] + ",";
                } else {
                    str += "\"" + heros[i][j] + "\",";
                }
            }
            str = str.substr(0, str.length - 1);

            if(i == heros.length - 1) {
                str += "]\n";
            } else {
                str += "],\n";
            }
            stream.write(str);
        }

        stream.write("}");
        stream.end();

        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}

exports.exportJsonObject = function(req, res) {
    console.log("export");
    __parentDir = path.dirname(process.mainModule.filename);
    heroService.getAllHeros(function(data) {
        var heros = data;
        var stream = fs.createWriteStream(__parentDir + '/exportJson/heros.json', {
            encoding: 'utf8'
        });

        stream.write("{\n");

        var str = "";

        for(var i = 0 ; i < heros.length ; i++) {
            console.log(i);
            str = "";
            str += "\t\"" + heros[i]["id"] + "\": {";
            for(var j in heros[i]) {
                if(typeof heros[i][j] == "function")
                    continue;

                str += "\n\t\t";
                if(typeof heros[i][j] == "number") {
                    str += "\"" + j + "\": " + heros[i][j] + ",";
                } else {
                    str += "\"" + j + "\": " + "\"" + heros[i][j] + "\",";
                }
            }
            str = str.substr(0, str.length - 1);

            if(i == heros.length - 1) {
                str += "\n\t}\n";
            } else {
                str += "\n\t},\n";
            }
            stream.write(str);
        }

        stream.write("}");
        stream.end();

        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}

exports.add = function(req, res) {

}

exports.update = function(req, res) {
    var id = req.params.id;
    var hero = req.body.hero;
    hero = JSON.parse(hero);
    heroService.update(hero, function(data) {
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}

exports.delete = function(req, res) {

}