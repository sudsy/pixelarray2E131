//E131Controller.js
//
var e131 = require("node-e131");



function E131Controller(host, port){
	this.host = host;
	this.port= port;
	this.universeControllers = [];
}

E131Controller.prototype.setChannel = function(universe, channel, value){
	if(!this.universeControllers[universe]){
		this.universeControllers[universe] = e131.createClient(this.host, this.port);
		this.universeControllers[universe].UNIVERSE = universe;
	} 

	// console.log(this.port);
	this.universeControllers[universe].dmxdata = this.universeControllers[universe].dmxdata || new Array(512);

	// console.log(universe + "-" + channel + "-" + value);
	this.universeControllers[universe].dmxdata[channel - 1] = value;
	
};

E131Controller.prototype.send = function(){
	this.universeControllers.forEach(function(controller){
		// console.log(controller.dmxdata);
		controller.send(controller.dmxdata);
	});
};

E131Controller.prototype.close = function(){
	this.universeControllers.forEach(function(controller){
		controller.close();
	});
};


module.exports =E131Controller;