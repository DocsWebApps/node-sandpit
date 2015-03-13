// Node is execllent when it comes to handling data as streams
// There are two particluar popular streams
// Readable and Writable streams

// Request object is a readable stream and inherits from
// EmitterEvent so it can also emit events
// Events:
// readable - when some chunk of data is readable
// end - when the stream has finished
var http, server1, server2, server3;
http=require('http');
server1=http.createServer();
server2=http.createServer();
server3=http.createServer();

// Output request to console
server1.on('request', function(request, response) {
  response.writeHead(200);
  request.on('readable', function() {
    while(null!=(chunk=request.read())) {
      console.log(chunk.toString());
    }
  });
  response.end();
}).listen(8080);

// Return request data back to client
server2.on('request', function(request, response) {
  response.writeHead(200);
  request.on('readable', function() {
    while(null!=(chunk=request.read())) {
      response.write(chunk);
    }
  });
  response.end();
}).listen(8081);

// Return request data back to client using pipe
server3.on('request', function(request, response) {
  response.writeHead(200);
  request.pipe(response);
  response.end();
}).listen(8082);

// Read from the request and write to a file
var server4, fs, outFile;
fs=require('fs');
outFile=fs.createWriteStream('outputfile.txt');

server4=http.createServer();
server4.on('request', function(request, response) {
  response.writeHead(200);
  outFile.write('Message received...');
  response.on('end', function() {
    response.end('Uploaded...');
  });
}).listen(8083);

// Upload a file and return progress
var server5=http.createServer();

server5.on('request', function(request, response) {
  var newOutFile=fs.createWriteStream('newFile.png');
  var bytesToRead=request.headers['content-length'];
  var uploadedBytes=0;

  request.on('readable', function() {
    var chunk=null;
    while(null!=(chunk=request.read())) {
      uploadedBytes+=chunk.length;
      var progress=(uploadedBytes/bytesToRead)*100;
      newOutFile.write(chunk);
      response.write('Progress ...'+parseInt(progress, 10)+'%\n');
    }
  });

  //request.pipe(newOutFile);

  request.on('end', function() {
    response.end('Uploaded...');
  });
  
}).listen(8084);

// Read a file and output a file
var myInFile=fs.createReadStream('../../Pictures/js.png');
var myOutFile=fs.createWriteStream('myOutFile.png');

myInFile.pipe(myOutFile,{end: false});

myInFile.on('end', function() {
  console.log('All done!');
});

// Simple http web server serving static assets
// DOESNT WORK FOR SOME REASON *************
var myWebserver=http.createServer();

myWebserver.on('request', function(request, response) {
  console.log('Request received...');
  var resource='index.html';

  fs.exists(resource, function(exists){
    if(exists) {
      var file=fs.createReadStream(resource);
      response.writeHead(200,{'Content-Type': 'text/html'});
      //response.write('<h1> Hello </h1>');
      file.pipe(response);
    } else {
      response.writeHead(404,{'myHeader': 'Bad'});
      response.write('<h1> 404 - Resource not found ! </h1>');
    }
    response.end();
  });

}).listen(8888);