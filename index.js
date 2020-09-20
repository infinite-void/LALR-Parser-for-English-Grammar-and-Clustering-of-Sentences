const express = require("express");
const app = express();
const spawn = require("child_process").spawn;


app.get("/", (req, res, next) => {
	const pythonProcess = spawn('python3',["./cluster.py", "This is school", "teacher is at school", "football is game"]);
	pythonProcess.stdout.on('data', (data) => {
		console.log(data.toString());
	});
	res.json("hello");
});


app.listen(3000, () => {
 	console.log("Server running on port 3000");
});
