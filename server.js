#!/usr/bin/env node


var app = module.exports = require('railway').createServer();
//console.log(process.env);
//console.log(process.env.VCAP_SERVICES);

if (!module.parent) {
	var port = process.env.PORT || 3000
	app.listen(port);
	console.log("Railway server listening on port %d within %s environment", port, app.settings.env);
}

