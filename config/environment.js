var express = require('express');
var weibo = require('weibo');

/**
 * init weibo api settings
 */ 

weibo.init('weibo', '2815523970', '3569f362e65a2d44b23e873ec0d608f2');

app.configure(function(){
    var cwd = process.cwd();
    
    app.use(express.static(cwd + '/public', {maxAge: 86400000}));
    app.set('view engine', 'ejs');
    app.set('view options', {complexNames: true});
    app.set('jsDirectory', '/javascripts/');
    app.set('cssDirectory', '/stylesheets/');
    app.use(express.bodyParser());
    app.use(express.cookieParser('secret'));
    app.use(express.session({secret: 'secret'}));
    app.use(express.methodOverride());
    app.use(app.router);

    app.use(  
      weibo.oauth({
        loginPath: '/login',
        logoutPath: '/logout',
        callbackPath: '/callback',

        afterLogin: function (req, res, callback) {
          console.log('after login:');
          console.log(req.session.oauthUser && req.session.oauthUser.screen_name, 'login success');
          process.nextTick(callback);
        },
        beforeLogout: function (req, res, callback) {
          console.log('before logout');
          console.log(req.session.oauthUser && req.session.oauthUser.screen_name, 'loging out');
          process.nextTick(callback);
        }
      }));

    
});

