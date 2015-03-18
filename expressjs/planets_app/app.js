// This is the main file of the planets app
// This app allows you to add or delete planets
var express=require('express'),
    app=express(),
    port=8888,
    planets={'Earth':'A watery blue world','Mars':'The red planet'},
    bodyParser=require('body-parser'),
    // body-parser returns a middleware function/handler
    // that decodes a urlencoded body in a request
    parseUrlencoded=bodyParser.urlencoded({extended: false});

// Make your application's assets and views available
// html, js, css, images etc
app.use(express.static('views')); // html views
app.use(express.static('public')); // css, js, images
app.use(express.static('../../bower_components')); // jquery, bootstrap

// General function to Capitalise planet names
var capitalise=function(planet) {
  return planet[0].toUpperCase()+planet.slice(1).toLowerCase();
};

// Take the planet param passed in, capitalise it and place it in the request object
app.param('planet', function(request,response,next) {
  var planet=request.params.planet;
  request.planet=capitalise(planet);
  next();
});

// Delete planet
app.delete('/planet/:planet', function(request, response) {
  var planet=request.planet;
  if(planets[planet]) {
    delete planets[planet];
    response.sendStatus(200);
  } else {
    response.sendStatus(404);
  }
});

// Get planet description
app.get('/planet/:planet', function(request,response) {
  var desc=planets[request.planet];
  if(desc) {
    response.status(200).json(desc);
  } else {
    response.status(404).json('Resource not found!');
  }
});

// Get list of planets
app.get('/planets', function(request,response) {
  response.status(200).json(Object.keys(planets));
});

// You can chain handlers sequentially !!
// Here parseUrlencoded gets run first followed by my anonymous function
// routes can take multiple handlers as arguments that get
// executed sequentially
// this enables us to reuse middleware handlers for validation, authentiction etc
app.post('/planets', parseUrlencoded, function(request, response) {
  var newPlanet=request.body;
  var name=capitalise(newPlanet.name);
  planets[name]=newPlanet.description;
  response.status(201).json(name);
})

// Listen on port
app.listen(port, function() {
  console.log('Planets appp server listening on '+port+' ...');
});