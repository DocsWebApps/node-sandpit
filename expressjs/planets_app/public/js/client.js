var PLANETINDEX={
  init: function() {
    var appendTo=function(planets) {
      var list=[];
      var content, planet;
      for(var i in planets) {
        planet=planets[i];
        content="<a href='#' data-planet="+planet+"><img id='del-image' src='/images/delete.png'></a><a href='/planets/"+planet+"'>"+planet+"</a>"
        list.push($('<li>', {html: content}));
      }
      $('#planet-list').append(list);
    };

    $('#planet-list').on('click','a[data-planet]', function(event) {
      var target=$(event.currentTarget);
      var planet=target.data('planet');
      if(!confirm('Are you sure you want to delete '+planet+' ?')) {
        return false;
      }

      $.ajax({
        url: '/planets/'+planet,
        type: 'DELETE'
      }).done(function() {
        target.parents('li').remove();
      });
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