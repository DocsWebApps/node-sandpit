// Use socket.io to create a two way realtime chat programme - cool !

var express=require('express');
var app=express();
var server=require('http').createServer(app);
var io=require('socket.io')(server);

app.get('/', function(req,res) {
  console.log('Client to client connected via express');
  res.sendFile(__dirname+'/socketClient.html');
});

io.on('connection', function(client) {
  console.log('Client to client connected via socket.io');
  client.emit('greeting', 'Hello from the server...');

  client.on('message', function(message) {
    console.log(message)
    client.broadcast.emit('messages', 'Server - I got ya message');
  });
});

server.listen(8080);