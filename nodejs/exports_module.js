var foo=function() {
  return 'I am foo';
};

var bar=function() {
  return 'I am bar';
};

var baz=function() {
  return 'I am baz';
};

var makeRequest=function(message) {
  var http=require('http');
  var options={host: 'localhost', port: 8888, path: '/', method: 'POST'};
  var server=http.createServer();

  server.on('request', function(request, response){
    response.end('OK, I got ya request boy ....');
  }).listen(8888);

  var request=http.request(options, function(response){
    response.on('data', function(data){
      console.log(data.toString());
    });
  });

  request.write(message);
  request.end();
};

// expose multiple properties
exports.foo=foo;
exports.bar=bar;
exports.makeRequest=makeRequest;