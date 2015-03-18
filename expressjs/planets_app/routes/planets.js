var express=require('express'),
    router=express.Router(),
    planets={'Earth':'A watery blue world','Mars':'The red planet'},
    bodyParser=require('body-parser'),
    // body-parser returns a middleware function/handler
    // that decodes a urlencoded body in a request
    parseUrlencoded=bodyParser.urlencoded({extended: false}),
    // General function to Capitalise planet names
    capitalise=function(planet) {
      return planet[0].toUpperCase()+planet.slice(1).toLowerCase();
    };

// Routes for all /planets requests
router.route('/')
  .get(function(request,response) {
      response.status(200).json(Object.keys(planets));
    })
    // You can chain handlers sequentially !!
    // Here parseUrlencoded gets run first followed by my anonymous function
    // routes can take multiple handlers as arguments that get executed sequentially
    // this enables us to reuse middleware handlers for validation, authentiction etc
    .post(parseUrlencoded, function(request, response) {
      var newPlanet=request.body;
      var name=capitalise(newPlanet.name);
      planets[name]=newPlanet.description;
      response.status(201).json(name);
    });

// Routes for all /planet/:planet requests
router.route('/:planet')
// For all requests with :planet, capitalise it and place it in the request object
  .all(function(request,response, next) {
    var planet=request.params.planet;
    request.planet=capitalise(planet);
    next();
  })
  .get(function(request,response) {
    var desc=planets[request.planet];
    if(desc) {
      response.status(200).json(desc);
    } else {
      response.status(404).json('Resource not found!');
    }
  })
  .delete(function(request, response) {
    var planet=request.planet;
    if(planets[planet]) {
      delete planets[planet];
      response.sendStatus(200);
    } else {
      response.sendStatus(404);
    }
  });

module.exports = router;