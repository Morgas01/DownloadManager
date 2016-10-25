(function(µ,SMOD,GMOD,HMOD,SC){

	var DBObj=µ.getModule("DBObj"),
		FIELD=µ.getModule("DBField");

	SC=SC({
		rel:"DBRel"
	})

	var DOWNLOAD=µ.Class(DBObj,{
		objectType:"Download",
		init:function(param)
		{
			param=param||{};

			this.mega(param);

			this.addField("name",		FIELD.TYPES.STRING	,param.name);
			this.addField("filename",	FIELD.TYPES.STRING	,param.filename);
			this.addField("size",		FIELD.TYPES.INT		,param.size);
			this.addField("filesize",	FIELD.TYPES.INT		,param.size);
			this.addField("state",		FIELD.TYPES.STRING	,param.state||DOWNLOAD.states.PENDING);
			this.addField("message",	FIELD.TYPES.JSON	,param.message);

			this.addRelation("package",DOWNLOAD.Package,SC.rel.TYPES.PARENT,"children","package");

		}
	});
	DOWNLOAD.states={
		DISABLED:"Disabled",
		PENDING:"Pending",
		RUNNING:"Running",
		DONE:"Done",
		FAILED:"Failed"
	};

	DOWNLOAD.Package=µ.Class(DBObj,{
		objectType:"Package",
		init:function(param)
		{
			param=param||{};

			this.mega(param);

			this.addField("name",FIELD.TYPES.STRING,param.name);

			this.addRelation("children",DOWNLOAD.Package,SC.rel.TYPES.CHILDREN,"package","children");

		}
	});

	SMOD("Download",DOWNLOAD);
	if(typeof module!=="undefined")module.exports=DOWNLOAD;

})(Morgas,Morgas.setModule,Morgas.getModule,Morgas.hasModule,Morgas.shortcut);
