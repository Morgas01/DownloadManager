(function(µ,SMOD,GMOD,HMOD,SC){

	SC=SC({
		rq:"request",
		form:"gui.form"
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

})(Morgas,Morgas.setModule,Morgas.getModule,Morgas.hasModule,Morgas.shortcut);
