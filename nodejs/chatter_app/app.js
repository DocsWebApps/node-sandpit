// Use socket.io to create a two way realtime chat programme - cool !
// Require libraries
var express=require('express'),
    app=express(),
    // Create a node server process that can listen to both express(http) and socket(io) socket connections
    server=require('http').createServer(app),
    io=require('socket.io')(server),
    // Listen on port 8080
    port=8080,
    messages=[],
    chatters=[],
    savedMesgs=function(message) {
      if(messages.length>9) {
        messages.shift();
      }
      messages.push(message);
    };

// Allow access to static content, css, js, html and bower libraries
app.use(express.static('public')); // css, js, images
app.use(express.static('views')); // views
app.use(express.static('../../bower_components')); // jquery, bootstrap, socketio

// Set up a callback on a client socket io connection
io.on('connection', function(client) {
  console.log('Client connected via socket.io');
  client.emit('handshake', 'Hello from the server...');

  client.on('handshake', function(message) {
    console.log(message)
  });

  client.on('join', function(name) {
    client.name=name;
    chatters.push(name);
    client.broadcast.emit('join', name);
    client.emit('new', chatters, messages);
  });

  client.on('client-msg', function(message) {
    var newMessage={'name': client.name, 'message': message};
    savedMesgs(newMessage);
    client.broadcast.emit('server-msg', newMessage);
    client.emit('server-msg', newMessage);
  });
});

server.listen(port, function() {
  console.log('Server listening on '+port+' ....');
});