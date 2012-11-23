var weibo = require('weibo');

// change appkey to yours
var appkey = '2815523970';
var secret = '3569f362e65a2d44b23e873ec0d608f2';
var oauth_callback_url = 'http://song3p.com/callback';
weibo.init('weibo', appkey, secret, oauth_callback_url);

var user = { blogtype: 'weibo' };
var cursor = {count: 20};
weibo.public_timeline(user, cursor, function (err, statuses) {
  if (err) {
    console.error(err);
  } else {
    console.log(statuses);
  }
});