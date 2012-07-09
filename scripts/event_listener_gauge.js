define(['fireEventTracker', 'guage', 'jqGuage'], function(
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
