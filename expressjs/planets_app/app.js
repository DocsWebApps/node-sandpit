// This is the main file of the planets app
// This app allows you to add or delete planets
var express=require('express'),
    app=express(),
    port=8888,
    planets={'Earth':'A watery blue world','Mars':'The red planet'};

// Make your application's assets and views available
// html, js, css, images etc
app.use(express.static('views')); // html views
app.use(express.static('public')); // css, js, images
app.use(express.static('../../bower_components')); // jquery, bootstrap

app.get('/planets', function(request,response) {
  response.status(200).json(Object.keys(planets));
});

app.post('/planets', function(request, response) {
  response.status(201).json('Good');
})


app.listen(port, function() {
  console.log('Planets appp server listening on '+port+' ...');
});
