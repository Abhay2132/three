const fs = require("fs");
const http = require("http");
const path = require("path");

global.refresh = parseInt(Math.random() * 100);
//console.log(refresh);

function watcher(dirs, cb) {
	for (let dir of dirs) {
		fs.watch(dir, cb);
		let files = fs.readdirSync(dir);
		for (let file of files) {
			file = path.join(dir, file);
			let stat = fs.statSync(file);
			if (stat.isDirectory()) watcher([file], cb);
		}
	}
}

function sendFile ( fp , res ) {
	const ext = fp.split("/").at(-1).split("?")[0].split(".").at(-1);
	res.setHeader("Content-Type", mime[ext] || "octect/stream");
	res.setHeader("Content-Length", fs.statSync(fp).size);
	fs.readFile( fp, (e, d) => res.end(d));
}

http.createServer((req, res) => {
	const { url , method } = req;
	if (url == "/refresh" ) return res.end(refresh+"");
	res.on("finish", () => {
		console.log(method, url , res.statusCode);
	});
	const fp = (__dirname+"/public" + url);
	if ( url == "/") return sendFile(fp+"index.html", res);
	if (fs.existsSync(fp)) return sendFile(fp, res);
	
	res.writeHead(404);
	res.end();
}).listen(3000, () => {
	webpack();
	const dirs = [path.resolve("public", "js")];
	console.log("watching dirs : ", dirs);
	watcher(dirs,async  () => {
		if(compiling) return console.log("bundling :",compiling);
		compiling = true;
		await webpack(); global.refresh += 1
	});
});

const mime = {
	"js" : "application/javascript",
	"css" : "text/css",
	"htm" : "text/html",
	"html" : "text/html"
}

let compiling = false;
const webpack = () => new Promise ( a => {
const mode = "development";
let time = performance.now();
const webpack = require('webpack');
const config = require("./webpack.config.js");

const compiler = webpack({...config, mode} , (err, stats) => {
	compiling = false;
	console.log("bundling done")
	if ( err) return a(console.log({err}));
	let te = ": "+((performance.now() - time) /1000).toFixed(2);
	console.log("webpack-" + mode, te+"s");
	a(stats);
});
});
