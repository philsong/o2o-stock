load('application');

var nodegrass = require('nodegrass');

action('index',function(){
	render({title:"stock index"});
});
action('search',function(){
	render({title:"stock search"});
});

action('query',function(){
	//console.log(req);
	console.log("data2");
	console.log(req.url);
	var stock = req.url.split("?")[1];

	var urlRoot = "http://hq.sinajs.cn/list=";

	magicStockUrl = "http://smartstock.gtimg.cn/get.php?_func=filter&_page=1&_pagesize=30&hs_hsl=0.05&hs_zf=0.03&hs_lb=1&_default=1&_du_r_t=0.1939136243890971";
	if(stock == "all"){
		nodegrass.get(magicStockUrl, function(data,status,headers)
		{
			//console.log(data);
			eval(data);
			var stockList = _smartstock['data'];
			var nameList = [];
			for(var key in stockList){
				nameList.push(stockList[key].code);
			}
			var nameStr = nameList.join(',');
			var bigurl = urlRoot + nameStr;
			nodegrass.get(bigurl,function(mydata,status,headers)
			{
				var stockjson = {};
				var _arr = mydata.split(";");
				for(var i=0; i<_arr.length-1; i++){
					var fuckname = _arr[i].split('=')[0];
					console.log(fuckname);
					var name = fuckname.substring(fuckname.indexOf('str_')+4,fuckname.length);
					var _str = _arr[i].split("=")[1];
					//console.log("_str= "+_str);

					_mystr = _str.substring(1,30);
					_myarr = _mystr.split(",");
					stockjson[name] = {
						id		:	_myarr[0],
						today	:	_myarr[1],
						yesday	:	_myarr[2],
						now		:	_myarr[3]
					};

				}
				console.log(stockjson);
				//console.log(mydata);
				send(JSON.stringify(stockjson));
			},'gbk');
			//send(data);
		});
		return;
	}

	stock = parseInt(stock);
	var url = urlRoot + "sh" + stock;
	nodegrass.get(url,function(data){
		if(data.length < 40)
		{
			url = urlRoot + "sz" + stock;
			nodegrass.get(url,function(data2){
				if(data2.length < 40) 
				{
					console.log("wrong stock num");
					send("wrong");
				}
				else
				{
					send(getString(data2));
				}
			});
		}
		else
		{
			send(getString(data));
		}
	},'gbk');
});

function getString(str){
	var _str = str.split('=')[1];
	return _str.substring(1,_str.length-2);
}
