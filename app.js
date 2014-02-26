/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-06-21
 * Description: app
 */
var express = require('express')
    , route = require('./route')
    , urlrouter = require('urlrouter')
    , http = require('http')
    , path = require('path')
    , forward = require('forward')
    , connect = require('connect')
    , config = require('./app/config')
    , fs = require('fs')
    , ejs = require('ejs')
    , redis = require('./app/dao/redis/redis');

var app = express();

// all environments
app.set('port', process.env.PORT || 9090);
app.engine('.html', require('ejs').__express);
ejs.open = '<@';
ejs.close = '@>';
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
//app.use(express.favicon());
app.use(express.logger('dev'));

//app.use(express.bodyParser());
console.log(path.join(__dirname, 'public/upload'));
// keepExtensions: true
app.use(express.bodyParser({uploadDir: path.join(__dirname, 'public/upload')}));

app.use(express.methodOverride());
app.use(express.cookieParser('html5'));
app.use(express.session());
//app.use(app.router);
app.use(urlrouter(route));
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// config

// log
express.logger.format('home', ':remote-addr :response-time - [:date] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :res[content-length]');
app.use(express.logger({
    format: 'home',
    stream: fs.createWriteStream(__dirname + '/logs/access.log')
}));

// favicon
app.use('/favicon.ico', forward(__dirname + '/public/favicon.ico'));

// 解析静态文件
app.use('/shared', connect.static(__dirname + '/shared', { maxAge: 3600000 * 24 * 365 }));
app.use('/export', connect.static(__dirname + '/export', { maxAge: 3600000 * 24 * 365 }));

// 初始化redis连接
redis.init();

/**
 * Error handler
 */
app.use(function (err, req, res, next) {
    err.url = err.url || req.url;
    console.log(err.stack);
    res.statusCode = err.status || 500;
    res.render('500', {
        viewname: 'error',
        viewClassName: 'error_500'
    });
});

/**
 * Page not found handler
 */
app.use(function (req, res, next) {
    res.statusCode = 404;
    res.render('404', {
        viewname: 'error',
        viewClassName: 'error_404',
        title: '迷路了?'
    });
});

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express started on port ' + app.get('port'));
});