var http=require('http'),
	server=http.createServer();

server.on('request', function(req, resp) {
	resp.writeHead(200);
	req.on('readable', function() {
		var chunk=null;
		while((chunk=req.read())!==null) {
			console.log(chunk.toString());
		}
	});

	req.on('end', function() {
		resp.end();
	});
});

server.listen(8888);
console.log('Server listening on port 8888');