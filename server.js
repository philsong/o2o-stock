HOST = null; // localhost
PORT = process.env.VMC_APP_PORT || 8001;

/**
 * Module dependencies.
 */

var connect = require('connect');
var weibo = require('weibo');
var express = require('express'),
    ejs = require("ejs"),
    partials = require('express-partials');
var app = express();

/**
 * init weibo api settings
 */ 

weibo.init('weibo', '2815523970', '3569f362e65a2d44b23e873ec0d608f2');

/**
 * Create a web application.
 */

 // 定义共享环境
app.configure(function(){
    app.set("views", __dirname + "/views");   
    app.set("view engine", "ejs");   
    app.set("view options", {layout: true});
    app.use(partials());

    app.use(express.bodyParser());    
    app.use(express.cookieParser('o2o_cookie_secret'));
    app.use(express.session({ secret: "o2o_session_secret" }));

    app.use(express.methodOverride());
    app.use(app.router);//must put router after the above 2lines, otherwise, the session does not work.

    app.use(  
      weibo.oauth({
        loginPath: '/login',
        logoutPath: '/logout',
        afterLogin: function (req, res, callback) {
          console.log(req.session.oauthUser && req.session.oauthUser.screen_name, 'login success');
          process.nextTick(callback);
        },
        beforeLogout: function (req, res, callback) {
          console.log(req.session.oauthUser && req.session.oauthUser.screen_name, 'loging out');
          process.nextTick(callback);
        }
      }));
});

// 定义开发环境
app.configure('development', function(){
    app.use(express.static(__dirname + '/public'));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// 定义生产环境
app.configure('production', function(){
    var oneYear = 31557600000;
    app.use(express.static(__dirname + '/public', { maxAge: oneYear }));
    app.use(express.errorHandler());
});

app.get('/', function(req, res){
  var user = req.session.oauthUser;
  if (user) {
    res.render("index", {username: user.screen_name});
  }
  else
  {
    res.render("index", {username: ""});
  }
});

app.get('/reg', function(req, res){
  var user = req.session.oauthUser;
  if (user) {
    res.render("reg", {username: user.screen_name});
  }
  else
  {
    res.render("reg", {username: ""});
  }
});

app.get('/about', function(req, res){
  var user = req.session.oauthUser;
  if (user) {
    res.render("about", {username: user.screen_name});
  }
  else
  {
    res.render("about", {username: ""});
  }
});

app.get('/sel', function(req, res){
  var user = req.session.oauthUser;
  if (user) {
    res.render("selstock", {username: user.screen_name});
  }
  else
  {
    res.render("selstock", {username: ""});
  }
});

app.get('/auth', function (req, res) {
  var user = req.session.oauthUser;
  res.writeHeader(200, { 'Content-Type': 'text/html' });
  if (!user) {
    res.end('Login with <a href="/login?type=weibo">Weibo</a> | \
      <a href="/login?type=tqq">QQ</a> | \
      <a href="/login?type=github">Github</a>');
    return;
  }
  res.end('Hello, <img src="' + user.profile_image_url + '" />\
    <a href="' + user.t_url + 
    '" target="_blank">@' + user.screen_name + '</a>. ' + 
    '<a href="/logout">Logout</a><hr/><pre><code>' + JSON.stringify(user, null, '  ') + '</code></pre>');
});

app.listen(PORT);
console.log('Server start on', PORT);