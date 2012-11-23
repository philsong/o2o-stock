
var timer;
window.onLoad = new function(){
	checkTime();
	timer = setInterval("checkTime()",10000);
}

var lastvResultLeft;
var lastvResultRight;
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
	

	
	function callbackold(stockTB)
	{
		if(typeof vRESULT == 'undefined')
		{
			vRESULT=vLATEST;
		}
		if (equal(lastvResult, vRESULT))
		{
			console.log("same data,filter");
			console.log(vRESULT);
			return;
		}

		console.log(vRESULT);
		lastvResult=vRESULT;
		//stocks
		stocks = vRESULT.data.split("^");
		for (index in stocks)
		{
			console.log(stocks[index]);
			addRow(stocks[index], stockTB);
		}		
	}
	
	var callbackLatest = function()
	{
		//callback(stockTBLeft);		
		if (equal(lastvLatest, vLATEST))
		{
			console.log("same data,filter");
			console.log(vLATEST);
			return;
		}

		console.log(vLATEST);
		lastvLatest=vLATEST;
		//stocks
		stocks = vLATEST.data.split("^");
		for (index in stocks)
		{
			console.log(stocks[index]);
			addRow(stocks[index], stockTBLeft);
		}
	};
	
	var callback = function(stockTB)
	{
		// Hide the instructions	
		//document.getElementById("instructions").style.display = "none";	
		
		if(stockTB == stockTBRight)
		{
			lastvResult = lastvResultRight;
		}
		else
		{
			lastvResult = lastvResultLeft;
		}
		
		if (equal(lastvResult, vRESULT))
		{
			console.log("same data,filter");
			console.log(vRESULT);
			return;
		}
		var opanel;
		if(stockTB == stockTBRight)
			opanel= document.getElementById("stockTBRight");
		else
			opanel= document.getElementById("stockTBLeft");
		var pchildren = opanel.childNodes;
		//清空表中的行和列
		for(var a=0; a<pchildren.length; a++){
			opanel.removeChild(pchildren[a]);
		}
		
		console.log(vRESULT);
		
		if(stockTB == stockTBRight)
		{
			lastvResultRight = vRESULT;
		}
		else
		{
			lastvResultLeft = vRESULT;
		}
		
		//stocks
		stocks = vRESULT.data.split("^");
		for (index in stocks)
		{
			console.log(stocks[index]);
			addRow(stocks[index], stockTB);
		}		
	};
	var callbackLeft = function()
	{
		callback(stockTBLeft);		
	};	
	
	var callbackRight = function()
	{
		callback(stockTBRight);	
	};
	
	console.log(hour +":"+minute+":"+second);
	if(debug || ( (hour > 9 && minute >=24) && hour <15) || (hour == 15 && minute <= 1)){  
		console.log(initflag);
		//if(initflag == 0)
		{
			/*
			for (var index =0; index = stockTBRight.length;index++)
			{
				stockTBRight.deleteRow(index);
			}*/
			console.log("get all");
			insertJS('http://stock.gtimg.cn/data/index.php?appn=radar&t=all&d=09001200', callbackRight)
			insertJS('http://stock.gtimg.cn/data/index.php?appn=radar&t=all&d=12001515', callbackLeft)
			initflag=1;
		}
		
		console.log("get latest");
		//insertJS('http://stock.gtimg.cn/data/index.php?appn=radar&t=latest&v=vLATEST', callbackLeft)
	}
	else{
		insertJS('http://stock.gtimg.cn/data/index.php?appn=radar&t=all&d=09001200', callbackRight)
		insertJS('http://stock.gtimg.cn/data/index.php?appn=radar&t=all&d=12001515', callbackLeft)
		if (timer)
			clearTimeout(timer);
	}
}

function addRow(stock, stockTB){
	//添加一行
	var newTr = stockTB.insertRow(-1);
	items = stock.split("~");
	for (index in items)
	{
		//添加列
		var newTd = newTr.insertCell(-1);
		
		if(items[4] == "大买单" || items[4] == "封涨停板" || items[4] == "快速上涨") 
		{
			newTd.innerHTML= "<font color='red'>" + items[index] + "</font>";
		}
		else
		{
			newTd.innerHTML= "<font color='green'>" + items[index] + "</font>";
		}

	}
}
