(function() {
  var jquery = CTRACKER_BASE_URL + "jquery.min.js",
      guage = CTRACKER_BASE_URL + "gauge.min.js",
      jqGuage = CTRACKER_BASE_URL + "jquery.gauge.js";

  require([jquery, guage, jqGuage], function() {
    $(document).ready(function(){
      $("#ctracker-events-per-second-gauge").gauge({
         min: 0,
         max: 200,
         colorOfFill: ['white'],
         label: 'Events Per Second',
         bands: [
         {color: "orange", from: 150, to: 175},
         {color: "red", from: 175, to: 200}]
       })
      .gauge('setValue', 0);
    });
  });
}());
