// Middleware is important in Express
// A middleware component is a layer that the inccoming request passes through
// Many middleware layers can be in place and each middleware layer perfoms some processing 
// and passes the request/response on to the next layer
// At some point a middleware layer will respond to the client at which point the request ends

var express=require('express'),
    app=express(),
    port=8888,
    blocks={'Fixed':'A fixed thing','Movable':'Can be moved','Rotating':'A spining thing'},
    locations={'Fixed':'Static','Movable':'Moving','Rotating':'Spinning'};    

// Use our own middleware layer, defined in the file middleware_logger.js
var logger=require('./middleware_logger.js');
app.use(logger);

// You can even delcare the function in the callback
app.use(function(request,response,next) {
  var stream=process.stdout;
  stream.write('Second middleware layer\n');
  next();
});

// The only middleware that comes built into express is serve-static
// It enables you to tell express which folders hold resources that can be 
// served up by the process
app.use(express.static('../app'));
app.use(express.static('../bower_components'));

// Use middleware to look for variations on parameters
// Fixed, fixed, FiXed,fIxEd for example
// Put the param name back into the request object
// so that we can use it in multiple routes 
app.param('name', function(request, response, next) {
  var name=request.params.name;
  request.paramName=name[0].toUpperCase()+name.slice(1).toLowerCase();
  next();
});

// Dynamic routes, similar to ruby :-) - request.params.{param}
app.get('/blocks/:name', function(request, response){
  var description=blocks[request.paramName];
  if(description) {
    response.json(description);
  } else {
    response.status(404).json(request.paramName+' can not be found');
  }
});

app.get('/locations/:name', function(request, response) {
  var location=locations[request.paramName];
  if(location) {
    response.json(location);
  } else {
    response.status(404).json(location+' can not be found');
  }
});

// Query parameters can be used - request.query.{param}
app.get('/blocks', function(request, response) {
  var blocksArray=Object.keys(blocks);
  // Use request.query to get query string paramters - http://localhost:888/blocks?limit=1
  //console.log(request.query.limit);
  if(request.query.limit>=0)  {
    response.json(blocksArray.slice(0,request.query.limit));
  } else {
    response.json(blocksArray);
  }
});

app.listen(port, function() {
  console.log('Server listening on port '+port+' ....');
});