HOST = null; // localhost
PORT = process.env.VMC_APP_PORT || 8001;

var connect = require("connect");
var app = connect()
  .use(connect.logger('dev'))
  .use(connect.static('public'))
  .use(function(req, res){
    res.end('hello world\n');
  })
 .listen(PORT);

