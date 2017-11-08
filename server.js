var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://test.mosquitto.org')

//var fs = require('fs')

var mongodb = require('mongodb');
var db = null;
var mongoURL = "mongodb://pi:raspberry@10.129.24.20:27017/trackmypidb";
var testenv = process.env.OPENSHIFT_MONGODB_DB_URL;

var initDb = function(callback) {
	try{
		//console.log("Test: "+testenv);
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
};

client.on('connect',function (){
	client.subscribe('hfolguera')
	console.log("Up & Running!");
	if (db == null) {
		initDb(function(err){});
	}
});

client.on('message', function (topic,message) {
	if (db == null) {
		initDb(function(err){});
	}else{
		try{
			console.log("RAW Message: "+message.toString());
			db.collection("tpv").insertOne(message.toString(), function(err, res) {
			if (err) throw err;
				console.log("1 document inserted");
			});

			var jsonMessage = JSON.parse(message.toString());
			console.log(jsonMessage);

		} catch (ex){
			console.log("Exception!");
			console.log(ex);
		}
	}
});
