var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://test.mosquitto.org')

//var fs = require('fs')

client.on('connect',function (){
	client.subscribe('hfolguera')
	console.log("Up & Running!");
})

client.on('message', function (topic,message) {
	try{
		console.log(message.toString());
		var jsonMessage = JSON.parse(message.toString());
		console.log(jsonMessage);
		/*fs.appendFile('gps_results.txt', message+'\n', function(err) {
			if (err) {
				fs.appendFile('error.log',err);
			}
		});*/
	} catch (ex){
		console.log("Exception!");
	}
});

var mongodb = require('mongodb');
var db = null;
var mongoURL = "mongodb://pi:raspberry@10.129.24.20:27017/trackmypidb";
var testenv = process.env.OPENSHIFT_MONGODB_DB_URL;
try{
	console.log("Test: "+testenv);
	mongodb.connect(mongoURL, function(err, conn) {
		if (err) {
			callback(err);
			return;
		}

		db = conn;
		console.log('Connected to MongoDB at: %s', mongoURL);
		});
}catch(ex){
	console.log("ERROR: Can't connect to mongodb!");
	console.log(ex);
}
