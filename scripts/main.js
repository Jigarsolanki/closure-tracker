var CTRACKER_BASE_URL = "http://127.0.0.1:8585/scripts/";

(function() {
  var jquery = CTRACKER_BASE_URL + "jquery.min.js",
      highCharts = CTRACKER_BASE_URL + "highcharts.min.js",
      eventChart = CTRACKER_BASE_URL + "event_listener_chart.js",
      spies = CTRACKER_BASE_URL + "spies.js";

  require([jquery, highCharts, spies], function() {

    $('#closure-tracker-main-panel p').click(function() {
      $('#closure-tracker-expanded-panel').toggle();
    });

    require([eventChart], function() {});

  });
}());
