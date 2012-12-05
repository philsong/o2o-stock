var nodegrass = require('nodegrass');
nodegrass.get("https://github.com",function(data,status,headers){

	//console.log(data);
	console.log(status);
	console.log(headers);
},'utf8').on('error', function(e) {
    console.log("Got error: " + e.message);
});