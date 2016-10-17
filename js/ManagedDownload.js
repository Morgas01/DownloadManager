(function(µ,SMOD,GMOD,HMOD,SC){

	var DOWNLOAD=µ.getModule("Download");

	var MANAGEDDOWNLOAD=µ.Class(DOWNLOAD,{
		objectType:"Download",
		init:function(param,appOrigin)
		{
			param=param||{};

			this.mega(param);

			this.appOrigin=appOrigin;

		},
		update:function(param)
		{

		}
	});
	MANAGEDDOWNLOAD.states=DOWNLOAD.states;

	SMOD("ManagedDownload",MANAGEDDOWNLOAD);
	if(typeof module!=="undefined")module.exports=MANAGEDDOWNLOAD;

})(Morgas,Morgas.setModule,Morgas.getModule,Morgas.hasModule,Morgas.shortcut);
