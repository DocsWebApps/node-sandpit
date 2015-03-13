var http=require('http'),
		server=http.createServer(),
		fs=require('fs');

exports.echo=function() {
	server.on('request', function(req, resp) {
			req.pipe(resp);
			req.pipe(file);
	}).listen(8888);
	console.log('Server listening on 8888');
};