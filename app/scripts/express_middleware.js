var EXPRESS_MIDDLEWARE={
  init: function() {
    $.get('/blocks', function(data){
      var list=[];
      for(var i in data) {
        list.push($('<li>', {text: data[i]}));
      }
      $('#block-list').append(list);
    });
  }
};

$(document).ready(function(){
  EXPRESS_MIDDLEWARE.init();
});