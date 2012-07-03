var CTRACKER_BASE_URL = "http://127.0.0.1:8585/scripts/";

(function() {
  var jquery = CTRACKER_BASE_URL + "jquery.min.js",
      highCharts = CTRACKER_BASE_URL + "highcharts.min.js",
      eventChart = CTRACKER_BASE_URL + "event_listener_chart.js",
      eventGauge = CTRACKER_BASE_URL + "event_listener_guage.js",
      ctrackerTemplate = CTRACKER_BASE_URL + "ctracker_template.js",
      jqueryTemplate = CTRACKER_BASE_URL + "jquery.tmpl.min.js",
      eventTypesChart = CTRACKER_BASE_URL + "ctracker_event_types_chart.js",
      eventLogger = CTRACKER_BASE_URL + "event_logger.js";

  require([jquery, highCharts], function() {
    require([jqueryTemplate, ctrackerTemplate, eventLogger, eventTypesChart], function(){
      $('#closure-tracker-main-panel p').click(function() {
        $('#closure-tracker-expanded-panel').toggle();
      });
      $('#closure-tracker-expanded-panel').show();

      $(document).ready(function(){
        $.tmpl('mainPanel').appendTo('#closure-tracker-expanded-panel');
        require([eventGauge], function() {});
        require([eventChart], function() {});
        require([eventTypesChart], function() {});
        require([eventLogger], function() {});
      });
    });
  });
}());
