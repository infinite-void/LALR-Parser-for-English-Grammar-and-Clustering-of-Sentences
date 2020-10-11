const { Console } = require("console");
const express = require("express");
const app = express();
const spawn = require("child_process").spawn;

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	if ('OPTIONS' == req.method) {
	   res.sendStatus(200);
	}
	else {
	   next();
	}
});	

app.get("/", (req, res, next) => {
	var input = req.query.input;
	var clusterData, posData;
	var reply = {};
	console.log("Input   :  " + input + "\n\n");
	
	const pythonProcessPOS = spawn('python3',["./postagger.py", input]);
	pythonProcessPOS.stdout.on('data', (data) => {
		console.log("POS tag   : " + data.toString() + "\n\n");
	});
	
	const pythonProcess = spawn('python3',["./cluster.py", input]);
	pythonProcess.stdout.on('data', (data) => {
		console.log("Cluster Part   : \n" + data.toString() + "\n\n");	
	});
	
	
	res.json("heello");
});


app.listen(3000, () => {
 	console.log("Server running on port 3000");
});
