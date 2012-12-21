load('application');

var nodegrass = require('nodegrass');
var weibo = require('weibo');

//执行次数
var count = 0;
var ok =0;
var time = false;
var run=function()
{
	console.log(time);
	if(time) clearInterval(time);
	
	time = setInterval(function(){
		count++;
		console.log(count);
		console.log(ok);

		var time2 = process.hrtime();
		//nodegrass.get("http://qq.com",function(data,status,headers)
		nodegrass.get("http://qt.gtimg.cn/q=sh000001,sz399001",function(data,status,headers)
		{
			var diff = process.hrtime(time2);
			console.log('benchmark took %d seconds and %d nanoseconds',
              diff[0], diff[1]);

			//console.log(data);
			console.log(status);
			//console.log(headers);

			
			eval(data);
			//var stockLine= document.getElementById("stockLine");
			items_sh = v_sh000001.split("~");
			items = items_sh;
			var shtextcontent=items[1] + items[2] + "(" + items[3] + " " + items[31]+ ' '+ items[32] + '%)' 
				+" 昨收" +items[4]+" 今开"+items[5]  +" 最高" +items[33]+" 最低"+items[34]+" 振幅"+items[43] +"%";
			//$("p#stockLineSH").text(textcontent);
			//if (items[32][0] == '-' ) 
				//$("p#stockLineSH").css("color","green");
			//else
				//$("p#stockLineSH").css("color","red");
			items_sz = v_sz399001.split("~");
			items = items_sz;
			var sztextcontent=items[1] + items[2] + "(" + items[3] + " " + items[31]+ ' '+ items[32] + '%)' 
				+" 昨收" +items[4]+" 今开"+items[5]  +" 最高" +items[33]+" 最低"+items[34]+" 振幅"+items[43] +"%";
			//$("p#stockLineSZ").text(textcontent);

			content = data;
			this.title = '关于本站';
			var user = req.session.oauthUser;
			//console.log(req.session.oauthUser);
			if (user) {
				//username = user.screen_name;
				weibo.update(user, shtextcontent, function (err, status) {
				  if (err) {
				    //console.error(err);
				  } else {
				  	ok++;
				    console.log(status);
				  }
				});
			}
			else
			{
				console.log(time);
				if(time) clearInterval(time);
				console.log(time);
				//username = '';
			}

			console.log("run end:---");
			//render({title:'关于本站', contentSH: shtextcontent, contentSZ: sztextcontent});
			//render();//redirect('/#'); // root redirection
		},'gbk').on('error', function(e) {
		    console.log("Got error: " + e.message);
		});		
	},5000);	
}


action('index', function () {
	//run();

	//nodegrass.get("http://qq.com",function(data,status,headers)
	nodegrass.get("http://qt.gtimg.cn/q=sh000001,sz399001",function(data,status,headers)
	{
		console.log(data);
		console.log(status);
		console.log(headers);

		console.log("callbackLine");
		
		eval(data);
		//var stockLine= document.getElementById("stockLine");
		items_sh = v_sh000001.split("~");
		items = items_sh;
		var shtextcontent=items[1] + items[2] + "(" + items[3] + " " + items[31]+ ' '+ items[32] + '%)' 
			+" 昨收" +items[4]+" 今开"+items[5]  +" 最高" +items[33]+" 最低"+items[34]+" 振幅"+items[43] +"%";
		//$("p#stockLineSH").text(textcontent);
		//if (items[32][0] == '-' ) 
			//$("p#stockLineSH").css("color","green");
		//else
			//$("p#stockLineSH").css("color","red");
		items_sz = v_sz399001.split("~");
		items = items_sz;
		var sztextcontent=items[1] + items[2] + "(" + items[3] + " " + items[31]+ ' '+ items[32] + '%)' 
			+" 昨收" +items[4]+" 今开"+items[5]  +" 最高" +items[33]+" 最低"+items[34]+" 振幅"+items[43] +"%";
		//$("p#stockLineSZ").text(textcontent);

		render({title:'关于本站', contentSH: shtextcontent, contentSZ: sztextcontent});
		//render();//redirect('/#'); // root redirection
	},'gbk').on('error', function(e) {
	    console.log("Got error: " + e.message);
	});
	console.log("about end:---");
});