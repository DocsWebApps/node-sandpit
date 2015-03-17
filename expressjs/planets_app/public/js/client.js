var PLANETINDEX={
  init: function() {
    $('#planet-form').on('submit', function(event) {
      event.preventDefault();
      var form=$(this);
      var planetData=form.serialize();

      $.ajax({
        type: 'POST',
        url: '/planets',
        data: planetData
        }).done(function(returnData) {
          console.log(returnData);
      });
    });

    $.get('/planets', function(data) {
      var planets=[];
      for(var i in data) {
        planets.push($('<li>',{text: data[i]}));
      }
      $('#planet-list').append(planets);
    });
  }
};


$(document).ready(function() {
  PLANETINDEX.init();
});