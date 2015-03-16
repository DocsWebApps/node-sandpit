module.exports=function(request, response, next){
  var start= +new Date();
  var stream=process.stdout;
  var url=request.url;
  var method=request.method;

  response.on('finish', function() {
    var duration=+new Date()-start;
    stream.write('First middleware layer\n');
    var message=method+' to '+url+'\ntook '+duration+' ms\n\n';
    stream.write(message);
  });

  next();
};