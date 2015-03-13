// encapsulate properties using exports
var makeRequest=function(message) {
  var http=require('http');
  var options={host: 'localhost', port: 9999, path: '/', method: 'POST'};
  var server=http.createServer();

  server.on('request', function(request, response){
    response.end('OK, I got ya request boy and Im new ....');
  }).listen(9999);

  var request=http.request(options, function(response){
    response.on('data', function(data){
      console.log(data.toString());
    });
  });

  request.write(message);
  request.end();
};

// can only expose one property
module.exports=makeRequest;