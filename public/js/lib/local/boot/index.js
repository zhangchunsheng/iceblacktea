var Emitter = require('emitter');
window.EventEmitter = Emitter;

var protocol = require('pomelo-protocol');
window.Protocol = protocol;

var protobuf = require('pomelo-protobuf');
window.protobuf = protobuf;

var pomelo = require('pomelo-jsclient-socket.io');
window.pomelo = pomelo;
