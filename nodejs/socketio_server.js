// Use socket.io to create a two way realtime chat programme - cool !
// Require libraries
var express=require('express');
var app=express();

// Create a node server process that can listen to both express(http) and socket(io) socket connections
var server=require('http').createServer(app);
var io=require('socket.io')(server);

// Listen on port 8080
var port=8080;

// Allow access to static content, css, js, html and bower libraries
app.use(express.static('../app'));
app.use(express.static('../bower_components'));

// Set up action on socket io connection
io.on('connection', function(client) {
  console.log('Client to client connected via socket.io');
  client.emit('greeting', 'Hello from the server...');

  client.on('message', function(message) {
    console.log(message)
    client.broadcast.emit('messages', 'Server - I got ya message');
  });
});

server.listen(port, function() {
  console.log('Server listening on '+port+' ....');
});