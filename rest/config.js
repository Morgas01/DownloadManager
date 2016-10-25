module.exports=worker.configManager({

	"maximum downloads":{
		type:"number",
		min:1,
		step:1,
		default:3
	},

	"initial start":{
		type:"boolean",
		default:false
	}
});
