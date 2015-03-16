// Express
// Require the library - returns a function
var express=require('express');
// Execute the function to return an instance of the application, an object with lots of functions
var app=express();
// Set up a route
app.get('/', function(request, response) {
  response.send("Hello World\n");
  //response.json('Hello World');
});

app.get('/nodejs', function(request, response) {
  // request and response inherit from nodejs's http objects IncommingMessage() and ServerResponse()
  // as a result nodejs methods eg. write(), end() are availible
  response.write("Hello World from node\n");
  response.end();
});

// redirections
app.get('/tempRedirect', function(request, response){
  response.redirect(302, '/newpath');
});

app.get('/permRedirect', function(request, response){
  response.redirect(301, '/newpath');
});

app.get('/newpath', function(request, response) {
  response.send('New path\n');
});

// Start server
app.listen(8888, function() {
  console.log('Server is listening on 8888');
});