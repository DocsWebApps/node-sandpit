// Middleware is important in Express
// A middleware component is a layer that the inccoming request passes through
// Many middleware layers can be in place and each middleware layer perfoms some processing 
// and passes the request/response on to the next layer
// At some point a middleware layer will respond to the client at which point the request ends

var express=require('express'),
    app=express(),
    port=8888,
    blocks=['Fixed','Movable','Rotating'];
//  blocks=[{name: 'Fixed', description: 'A fixed thing'},{name: 'Movable', description: 'Can be moved'},{name: 'Rotating', descirption: 'A spining thing'}];    
// Need to refactor app.get('/blocks')

// Use our own middleware layer, defined in the file middleware_logger.js
var logger=require('./middleware_logger.js');
app.use(logger);

// You can even delcare the function in the callback
app.use(function(request, response,next){
  var stream=process.stdout;
  stream.write('Second middleware layer\n');
  next();
});

// The only middleware that comes built into express is serve-static
// It enables you to tell express which folders hold resources that can be 
// served up by the process
app.use(express.static('../app'));
app.use(express.static('../bower_components'));

app.get('/blocks', function(request, response) {
  // Use request.query to get query string paramters - http://localhost:888/blocks?limit=1
  console.log(request.query.limit);
  if(request.query.limit>=0)  {
    response.json(blocks.slice(0,request.query.limit));
  } else {
    response.json(blocks);
  }
});

app.listen(port, function() {
  console.log('Server listening on port '+port+' ....');
});