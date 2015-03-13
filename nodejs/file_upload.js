var http=require('http'),
	fs=require('fs');
	server=http.createServer(),
	port=7777;

server.on('request', function(request, response) {

	var file=fs.createWriteStream('file.png');;
	var fileSize=request.headers['content-length'];

	request.on('readable', function() {
		response.write(fileSize.toString());
	});

	request.on('end', function() {
		response.end();
	});

	request.pipe(file);

}).listen(port);

console.log('Server listening on port '+port);