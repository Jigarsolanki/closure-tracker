(function() {
  var jquery = CTRACKER_BASE_URL + "deps/jquery.min.js",
      guage = CTRACKER_BASE_URL + "deps/gauge.min.js",
      jqGuage = CTRACKER_BASE_URL + "deps/jquery.gauge.js",
      fireEventTracker = CTRACKER_BASE_URL + "fire_event_tracker.js";

  require([fireEventTracker, jquery, guage, jqGuage], function(
    fireEventTracker) {
    $(document).ready(function(){

      var gaugeWidget, renderCount;

      gaugeWidget = $("#ctracker-events-per-second-gauge").gauge({
         min: 0,
         max: 200,
         colorOfFill: ['white'],
         label: 'Events Per Second',
         bands: [
         {color: "orange", from: 150, to: 175},
         {color: "red", from: 175, to: 200}]
       });

      renderCount = function () {
        gaugeWidget.gauge('setValue', fireEventTracker.getCount());
        fireEventTracker.clearCount();
      };
      setInterval(renderCount, 250);
    });
  });
}());
