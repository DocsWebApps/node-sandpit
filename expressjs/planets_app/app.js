// This is the main file of the planets app
// This app allows you to add or delete planets
var express=require('express'),
    planets=require('./routes/planets.js');
    app=express(),
    port=8888;

// Make your application's assets and views available
// html, js, css, images etc
app.use(express.static('views')); // html views
app.use(express.static('public')); // css, js, images
app.use(express.static('../../bower_components')); // jquery, bootstrap

app.use('/planets', planets);

// Listen on port
app.listen(port, function() {
  console.log('Planets appp server listening on '+port+' ...');
});