
require("../js/Download");
var Download=require("../js/ManagedDownload");

var config=require("./config");
config.addListener("maximum downloads",startDownloads);


var info={
	state:false,	//pause state
	downloads:[]
};

//* test
info.downloads=[
	new Download({
		name:"test1",
		filename:"C:\\temp\\test1",
		size:0,
		fileSite:0
	},"DownloadManager"),
	new Download({
		name:"test2",
		filename:"C:\\temp\\test3",
		size:0,
		fileSite:0
	},"DownloadManager"),
	new Download({
		name:"test4",
		filename:"C:\\temp\\test4",
		size:0,
		fileSite:0,
		message:"test4!!!"
	},"DownloadManager"),
];
//*/
worker.event("downloads",info,"init",null);


module.exports={
	state:function(param)
	{
		if(param.method=="POST"&&param.data&&param.data.state!=info.state)
		{
			setState(param.data.state);
		}
		return {state:info.state};
	}
}
var setState=function(state)
{
	worker.event("downloads",info,"state",info.state=!!state);
	if(state) startDownloads();
}

var startDownloads=function()
{
	var running=info.downloads.filter(d=>d.state==Download.states.RUNNING).length;
	if(info.state)
	{
		for(var i=0;i<info.downloads.length&&config["maximum downloads"]>running;i++)
		{
			var download=info.downloads[i];
			if(download.state==Download.states.PENDING)
			{
				if(download.appOrigin==="DownloadManager")
				{
					//TOODO http download
				}
				else worker.feedback(download.appOrigin,{id:download.id,action:"start"});
			}
			download.state=Download.states.RUNNING;
			running++;
		}
	}
};

//setInterval(function(){setState(!info.state)},1000);
