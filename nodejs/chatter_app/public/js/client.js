var SOCKETPAGE={
  init: function() {
    var name=prompt('What is your name?');
    
    var server=io('http://localhost:8080');

    console.log('Connecting to the server....');

    server.on('handshake', function(message) {
      console.log(message);
      server.emit('handshake', 'Hi there from the client...');
    });

    server.on('new', function(chatters, messages) {
      chatters.forEach(function(value,index,array) {
        $('#chat-users').append('<h4>'+value+'</h4>');
      });
      messages.forEach(function(value,index,array) {
        $('#chat-talk').append('<h4>'+value.name+':  '+value.message+'</h4>');
      });
    });

    server.on('server-msg', function(message) {
      $('#chat-talk').append('<h4>'+message.name+':  '+message.message+'</h4>');
    });

    server.on('join', function(name) {
      $('#chat-users').append('<h4>'+name+'</h4>');
    });

    $('#chat-form').on('submit',function(event) {
      event.preventDefault();
      var message=$("#chat-message").val();
      server.emit('client-msg', message);
      $('#chat-form').trigger('reset');
    });

    server.emit('join', name);
  }
};

$(document).ready(function() {
  console.log('Inititating JS...');
  SOCKETPAGE.init();
});