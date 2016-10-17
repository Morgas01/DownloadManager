(function(µ,SMOD,GMOD,HMOD,SC){

	SC=SC({
		rq:"request",
		form:"gui.form",
		tData:"gui.TableData",
		sTable:"gui.selectionTable"
	});

	var configDiv=document.getElementById("config");
	var downloadsDiv=document.getElementById("downloads");

	SC.rq.json({
		method:"OPTIONS",
		url:"rest/config"
	}).then(function(configData)
	{
		configDiv.appendChild(SC.form(configData.description,configData.value));
	})

	configDiv.addEventListener("FormChange",function(event)
	{
		SC.rq({
			url:"rest/config",
			data:JSON.stringify({
				key:event.detail.key,
				value:event.detail.value
			})
		})
	});

	new EventSource("event/downloads").addEventListener("init",function initListener(initEvent)
	{
		this.removeEventListener("init",initListener);
		window.addEventListener("beforeunload",()=>this.close());

		data=JSON.parse(initEvent.data);


		var stateBtn=document.getElementById("stateBtn");
		var updateState=function(state)
		{
			stateBtn.dataset.state=state;
			stateBtn.textContent=state?"\u2016":"\u25b6"
		};
		stateBtn.addEventListener("click",function()
		{
			SC.rq.json({
				url:"rest/downloads/state",
				data:JSON.stringify({state:stateBtn.dataset.state!="true"})
			});
		});
		this.addEventListener("state",stateEvent=>updateState(JSON.parse(stateEvent.data)))
		updateState(data.state);

		var downloadsContainer=document.getElementById("downloads");
		var tableData=new SC.tData(data.downloads,[
			{
				name:"name",
				fn:function(cell,data)
				{
					cell.title=data.filename||"";
					cell.textContent=data.name||"";
				}
			},
			{
				name:"size",
				fn:function(cell,data)
				{
					cell.textContent=data.size;
					cell.classList.add("size");
				}
			},
			{
				name:"progress",
				fn:function(cell,data)
				{
					var prog=document.createElement("progress");
					prog.value=prog.title=data.filesize;
					prog.max=data.size;
					cell.appendChild(prog);
				}
			}
		])
		var selectionTable=SC.sTable(tableData);
		selectionTable.noInput=true;
		SC.sTable.selectionControl(selectionTable);
		downloadsContainer.appendChild(selectionTable);
	})

})(Morgas,Morgas.setModule,Morgas.getModule,Morgas.hasModule,Morgas.shortcut);
