var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://test.mosquitto.org')

var fs = require('fs')

client.on('connect',function (){
	client.subscribe('hfolguera')
	console.log("Up & Running!");
})

client.on('message', function (topic,message) {
	console.log(message)
	/*var jsonMessage = JSON.parse(message);
	console.log(jsonMessage);
	fs.appendFile('gps_results.txt', message+'\n', function(err) {
		if (err) {
			fs.appendFile('error.log',err);
		}*/
	});
});

