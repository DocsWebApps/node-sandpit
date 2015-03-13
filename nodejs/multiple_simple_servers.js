var http=require('http');
var server1=http.createServer();
var server2=http.createServer();

server1.on('request', function(req,resp) {
	resp.writeHead(200);
	resp.write("Hello I'm server1 on 7777");
});

server1.on('request', function(req,resp) {
	resp.write("And I am the second event, awesome");
	resp.end();
});

server2.on('request', function(req,resp) {
	resp.writeHead(200);
	resp.write("Hello I'm server2 on 7778");
	resp.end();
});

server1.listen(7777);
server2.listen(7778);

console.dir('Two servers running...');