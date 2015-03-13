// Express is a Sinatra inspired minimal web framework

// Simple web server
var express=require('express');
var app=express();

app.get('/getRequest/:name',function(req,resp) {
  var name=req.params.name;
  resp.send('Hello World - You have reached the web server '+name);
});

app.listen(8888);

// Create and process a request to retrive the greeting from the web server
var request=require('http').Request;
var url=require('http').Url;
var options={host: 'localhost', port: 8888, method: 'GET', path: '/getRequest/Doctor'};

//var serverUrl=url.format(options);