/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-06-28
 * Description: socket
 */
var GATE_HOST = "192.168.1.22";
var GATE_PORT = 4014;

function authEntry(uid, sessionId, token, callback) {
    queryEntry(uid, function(host, port) {
        entry(host, port, sessionId, token, callback);
    });
}

function queryEntry(uid, callback) {
    pomelo.init({
        host: GATE_HOST,
        port: GATE_PORT,
        user: {},
        handshakeCallback : function(){}
    }, function() {
        console.log('success');

        /*pomelo.request("gate.gateHandler.queryEntry", {
            uid: 1
        }, function(data) {
            pomelo.disconnect();
            console.log(data);
            callback(data.host, data.port);
        });*/
        pomelo.request("gate.gateHandler.queryServerList", {
            uid: 1
        }, function(data) {
            console.log(data);
            pomelo.disconnect();
            callback(data.serverLists[0].connectors.host, data.serverLists[0].connectors.port);
        });
    });
}

function entry(host, port, sessionId, token, callback) {
    // init socketClient
    // TODO for development
    if(host === '127.0.0.1') {
        host = GATE_HOST;
    }
    pomelo.init({host: host, port: port, log: true}, function() {
        console.log("connector.entryHandler.entry");
        pomelo.request('connector.entryHandler.entry', {
            sessionId: sessionId,
            token: token,
            serverId: 1
        }, function(data) {
            console.log(data);

            if (callback) {
                callback(data);
            }

            if (data.code == 1001) {
                alert('Login fail!');
                return;
            } else if (data.code == 1003) {
                alert('loginName not exists!');
                return;
            }

            if (data.code != 200) {
                alert('Login Fail!');
                return;
            }
        });

        /*console.log('connector.roleHandler.createMainPlayer');
        pomelo.request('connector.roleHandler.createMainPlayer', {
            sessionId: sessionId,
            token: token,
            cId: 1,
            nickname: "hello"
        }, function(data) {
            console.log(data);
        });*/

        /*console.log('battle.battleHandler.fight');
        pomelo.request('battle.battleHandler.fight', {
            sessionId: sessionId,
            token: token
        }, function(data) {
            console.log(data);
        });*/
    });
}

var data = {
    uid: 1,
    loginName: "wozlla",
    registerType: 1,
    sessionId: "729B28D90AB2E90B494F7DD71976666F",
    token: "6d90953e70d8e81e25b461f515a4a6cb159e74ea3067c71b92d862e3ad9c61e5"
};
