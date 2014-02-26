/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-11-13
 * Description: heroV2Service
 */
var heroV2Dao = require('../../dao/v2/HeroV2Dao');
var utils = require('../../utils/utils');

var HeroV2Service = function() {

}

HeroV2Service.prototype.getAllHeros = function(next) {
    heroV2Dao.getAllHeros(function(err, heros) {
        var starLevel;
        var type;
        var star = "☆";
        var typeInfo = {
            "1":"◆",
            "2":"▲",
            "3":"◎"
        };
        for(var i = 0 ; i < heros.length ; i++) {
            starLevel = "";
            for(var j = 0 ; j < heros[i].starLevel ; j++) {
                starLevel += star;
            }
            type = typeInfo[heros[i].type];
            heros[i].name = type + " " + starLevel + " " + heros[i].heroName;
        }
        next(err, heros);
    });
}

HeroV2Service.prototype.getData = function(next) {
    heroV2Dao.getData(next);
}

HeroV2Service.prototype.update = function(heroV2, next) {
    heroV2.heroName = heroV2.name;
    delete heroV2.name;
    heroV2Dao.update(heroV2, next);
}

/**
 * 导入数据
 * @param next
 */
HeroV2Service.prototype.import = function(next) {
    heroV2Dao.truncate(function(result) {
        utils.readFile("app/config/data/heros.txt", function(data) {
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
    var heroV2 = {};

    var row = data.shift();

    rows = row.split(",");
    if(row.indexOf(",") < 0) {
        insertData(data, next);
    }

    /*heroV2 = {
        heroId: rows[0],
        heroName: rows[1],
        starLevel: rows[2] == "" ? 1 : rows[2],
        type: rows[3] == "" ? 1 : rows[3],
        hp: rows[4] == "" ? 0 : rows[4],
        attack: rows[5],
        speed: rows[6],
        defense: rows[7] == "" ? 1 : rows[7],
        sunderArmor: rows[8],
        criticalHit: rows[9],
        block: rows[10],
        dodge: rows[11],
        counter: rows[12],
        addHp: rows[13],
        addAttack: rows[14]
    };*/
    heroV2 = {
        heroId: rows[0],
        heroName: rows[1],
        avatar: rows[2],
        starLevel: rows[3] == "" ? 1 : rows[3],
        trait: rows[3] == "" ? 1 : rows[3],
        type: rows[4] == "" ? 1 : rows[4],
        form: rows[5] == "" ? 1 : rows[5],
        hp: rows[6] == "" ? 0 : rows[6],
        attack: rows[7],
        speed: 1,
        defense: rows[8] == "" ? 1 : rows[8],
        sunderArmor: rows[9] == "" ? 1 : rows[9],
        criticalHit: 0,
        block: 0,
        dodge: 0,
        counter: 0,
        addHp: rows[10] == "" ? 1 : rows[10],
        addAttack: rows[11] == "" ? 1 : rows[11],
        addDefense: rows[12] == "" ? 1 : rows[12],
        addSunderArmor: rows[13] == "" ? 1 : rows[13],
        animationGroup: rows[14],
        attrPicture: rows[15],
        formationPicture: rows[16]
    };
    heroV2Dao.insert(heroV2, function() {
        insertData(data, next);
    });
}

/**
 * 导出数据
 * @param next
 */
HeroV2Service.prototype.export = function(next) {
    this.getData(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].heroId;
        }
        utils.writeJSONFile(data, "herosV2", next);
    });
}

HeroV2Service.prototype.exportJson = function(next) {
    this.getData(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].heroId;
        }
        utils.writeJSONArrayFile(data, "herosV2", next);
    });
}

module.exports = new HeroV2Service();