(function() {
  var jquery = CTRACKER_BASE_URL + "jquery.min.js",
      guage = CTRACKER_BASE_URL + "gauge.min.js",
      jqGuage = CTRACKER_BASE_URL + "jquery.gauge.js",
      eventPerSecondTracker = CTRACKER_BASE_URL + "events_per_second_tracker.js";

  require([eventPerSecondTracker, jquery, guage, jqGuage], function(
    eventPerSecondTracker) {
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
        gaugeWidget.gauge('setValue', eventPerSecondTracker.getCount());
        eventPerSecondTracker.clearCount();
      };

      setInterval(renderCount, 250);
    });
  });
}());
