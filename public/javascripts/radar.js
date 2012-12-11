
var timer;

window.onLoad = new function(){
	//DrawStocks();
	checkTime();
	timer = setInterval("checkTime()",10000);
}

function DrawStocks()
{
	$.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function(data) {
		// Create the chart
		window.chart = new Highcharts.StockChart({
			chart : {
				renderTo : 'container'
			},

			rangeSelector : {
				selected : 1
			},

			title : {
				text : 'AAPL Stock Price'
			},
			
			series : [{
				name : 'AAPL',
				data : data,
				tooltip: {
					valueDecimals: 2
				}
			}]
		});
	});
}

function checkTimeLine()
{
	var displayfun=function()
	{
		var shtext=items[1] + items[2] + "(" + items[3] + ')' +"昨收" +items[4]+"今开"+items[5];
		$("p#stockLineSH").text(shtext);
		$("p#stockLineSH").css("color","red");
	}

	var callbackLine = function()
	{
		console.log("callbackLine");
		//var stockLine= document.getElementById("stockLine");
		items_sh = v_sh000001.split("~");
		items = items_sh;
		var textcontent=items[1] + items[2] + "(" + items[3] + " " + items[31]+ ' '+ items[32] + '%)' 
			+" 昨收" +items[4]+" 今开"+items[5]  +" 最高" +items[33]+" 最低"+items[34]+" 振幅"+items[43] +"%";
		$("p#stockLineSH").text(textcontent);
		console.log(items[32]);
		console.log(items[32][0]);
		if (items[32][0] == '-' ) 
			$("p#stockLineSH").css("color","green");
		else
			$("p#stockLineSH").css("color","red");

		items_sz = v_sz399001.split("~");
		items = items_sz;
		var textcontent=items[1] + items[2] + "(" + items[3] + " " + items[31]+ ' '+ items[32] + '%)' 
			+" 昨收" +items[4]+" 今开"+items[5]  +" 最高" +items[33]+" 最低"+items[34]+" 振幅"+items[43] +"%";
		$("p#stockLineSZ").text(textcontent);
		if (items[32][0] == '-' ) 
			$("p#stockLineSZ").css("color","green");
		else
			$("p#stockLineSZ").css("color","red");

		
		//for (index in items_sh)
		//{
			//添加列
			//console.log(index+":"+items_sh[index]);
		//}
		console.log(v_sh000001);
		console.log(v_sz399001);	
	}

	insertJS('http://qt.gtimg.cn/q=sh000001,sz399001', callbackLine);
}

var lastvResult;
var lastvLatest;
var debug = 0;
var initflag=0;
function checkTime(){
	var myDate = new Date();
	var hour = myDate.getHours();
	var minute = myDate.getMinutes();
	var second = myDate.getSeconds();
	var stocks = [];
	
	var callback = function()
	{
		// Hide the instructions	
		//document.getElementById("instructions").style.display = "none";	
		
		if (equal(lastvResult, vRESULT))
		{
			console.log("same data,filter");
			//console.log(vRESULT);
			return;
		}
		//var stockTB = $("div#stockTB");
		var stockTB= document.getElementById("stockTB");
		var pchildren = stockTB.childNodes;
		//清空表中的行和列
		for(var a=0; a<pchildren.length; a++){
			stockTB.removeChild(pchildren[a]);
		}
		
		console.log(vRESULT);	

		lastvResult = vRESULT;

		var stockheader = "时间~股票代码~股票简称~异动价格~异动类型~异动信息";
		addRow(stockheader, stockTB);				
		//stocks
		stocks = vRESULT.data.split("^");
		for (index in stocks)
		{
			//console.log(stocks[index]);
			addRow(stocks[index], stockTB);
		}
	};
	
	console.log(hour +":"+minute+":"+second);

	checkTimeLine();

	if(debug || ( (hour == 9 && minute >=24) || hour > 9 && hour <15) || (hour == 15 && minute <= 1)){  
		console.log(initflag);
		//if(initflag == 0)
		{
			/*
			for (var index =0; index = stockTBRight.length;index++)
			{
				stockTBRight.deleteRow(index);
			}*/
			console.log("get all begin");
			insertJS('http://stock.gtimg.cn/data/index.php?appn=radar&t=all&d=09001515', callback);
			console.log("get all end");
			initflag=1;
		}
		
		console.log("get latest");
		//insertJS('http://stock.gtimg.cn/data/index.php?appn=radar&t=latest&v=vLATEST', callbackLeft)
	}
	else{
		console.log("get all");
		insertJS('http://stock.gtimg.cn/data/index.php?appn=radar&t=all&d=09001515', callback);
		if (timer)
			clearTimeout(timer);
	}
}

function addRow(stock, stockTB){
	//添加一行
	//console.log(stock);
	var newTr = stockTB.insertRow(-1);
	items = stock.split("~");
	for (index in items)
	{
		//添加列
		var newTd = newTr.insertCell(-1);
		
		if(items[4] == "异动类型")
		{
			newTd.innerHTML= "<font color='blue'>" + items[index] + "</font>";
		}
		else if(items[4] == "大买单" || items[4] == "封涨停板" || items[4] == "快速上涨") 
		{
			newTd.innerHTML= "<font color='red'>" + items[index] + "</font>";
		}
		else
		{
			newTd.innerHTML= "<font color='green'>" + items[index] + "</font>";
		}

	}
}
