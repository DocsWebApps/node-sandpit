var PLANETINDEX={
  init: function() {
    var appendTo=function(planets) {
      var list=[];
      var content, planet;
      for(var i in planets) {
        planet=planets[i];
        content="<img id='del-image' src='/images/delete.png'><a href='/planet/"+planet+"'>"+planet+"</a>"
        list.push($('<li>', {html: content}));
      }
      $('#planet-list').append(list);
    };

    $('#del-image').on('click', function(event) {
      console.log('gotcha');
    });

    $('#planet-form').on('submit', function(event) {
      event.preventDefault();
      var form=$(this);
      var planetData=form.serialize();

      $.ajax({
        type: 'POST',
        url: '/planets',
        data: planetData
        }).done(function(returnData) {
          appendTo([returnData]);
          form.trigger('reset');
      });
    });

    $.get('/planets', appendTo);
  }
};

$(document).ready(function() {
  PLANETINDEX.init();
});