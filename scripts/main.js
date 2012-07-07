var CTRACKER_BASE_URL = "http://127.0.0.1:8585/scripts/";

(function() {
  var jquery = CTRACKER_BASE_URL + "deps/jquery.min.js",
      highCharts = CTRACKER_BASE_URL + "deps/highcharts.min.js",
      eventChart = CTRACKER_BASE_URL + "event_listener_chart.js",
      eventGauge = CTRACKER_BASE_URL + "event_listener_gauge.js",
      ctrackerTemplate = CTRACKER_BASE_URL + "ctracker_template.js",
      jqueryTemplate = CTRACKER_BASE_URL + "deps/jquery.tmpl.min.js",
      eventTypesChart = CTRACKER_BASE_URL + "ctracker_event_types_chart.js",
      eventLogger = CTRACKER_BASE_URL + "event_logger.js",
      panelDisplayer = CTRACKER_BASE_URL + "panel_displayer.js";

  require([jquery, highCharts], function() {
    require([jqueryTemplate, ctrackerTemplate],
      function(){
      $(document).ready(function() {
        require([panelDisplayer], function(){
          require([eventGauge], function() {});
          require([eventChart], function() {});
          require([eventTypesChart], function() {});
          require([eventLogger], function() {});
        });
      });
    });
  });
}());
