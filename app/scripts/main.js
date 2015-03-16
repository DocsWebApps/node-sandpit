var SOCKETPAGE={
  init: function() {
    var server=io('http://localhost:8080');

    console.log('Connecting to the server....');

    server.on('greeting', function(message) {
      console.log(message);
      server.emit('response', 'Hi there from the client...');
    });

    server.on('server-msg', function(message) {
      $('#chat-talk').append('<h4>'+message+'</h4>');
    });

    $('#chat-form-submit').on('click',function() {
      var message=$("#chat-message").val();
      server.emit('client-msg', message);
    });

  }
};

$(document).ready(function() {
  console.log('Inititating JS...');
  SOCKETPAGE.init();
});