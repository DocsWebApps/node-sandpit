var EventEmitter, myLogger;
EventEmitter=require('events').EventEmitter;
myLogger=new EventEmitter();

// Add a custom event and callback 
myLogger.on('myEvent', function(message) {
  console.log('myEvent triggered with '+message);
});

// Add another callback to the same custom event
myLogger.on('myEvent', function(message) {
  console.log('myEvent again triggered with '+message);
});

// Add a different custom event and callback
myLogger.on('myEvent1', function(message) {
  console.log('myEvent1 triggered with '+message);
});

// Call the events
myLogger.emit('myEvent', 'Hey hey');
myLogger.emit('myEvent1', 'Hey hey');