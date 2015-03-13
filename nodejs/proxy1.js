var http=require('http'),
	serverA=http.createServer(),
	serverB=http.createServer();

serverB.on('request', function(req,resp) {
	resp.write('You have reached ServerB');
	resp.end();
}).listen(7778);

console.log('ServerB is up and listening on port 7778');

serverA.on('request', function(req, respA) {
	var options={'host':'localhost','port':'7778','method':'GET','path':'/'};
	var request=http.request(options, function(respB) {
		respB.on('data', function(data) {
			respA.write(data);
			respA.end();
		});
	});
	request.write('hello');
	request.end();
}).listen(7777);

console.log('ServerA is up and listening on port 7777');