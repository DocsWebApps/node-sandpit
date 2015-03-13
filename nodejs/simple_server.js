// Simple server -- invoked using curl http://localhost:4000
var http=require('http'),
	server;

server=http.createServer(function(request, response) {
	response.writeHead(200,{'Content-Type': 'text/html','Daves-header':'hey hey fat boy!'});
	response.write('Process is running...\n');
	//console.log(request.headers);
	response.write(request.headers.host+'\n');
	setTimeout(function() {
		response.write('5 second timeout finished\n');
		response.end();
	}, 5000);
}).listen(4000);