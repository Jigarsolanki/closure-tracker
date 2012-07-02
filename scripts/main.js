var CTRACKER_BASE_URL = "http://127.0.0.1:8585/scripts/";

(function() {
  var jquery = CTRACKER_BASE_URL + "jquery.min.js",
      highCharts = CTRACKER_BASE_URL + "highcharts.min.js",
      eventChart = CTRACKER_BASE_URL + "event_listener_chart.js",
      eventGauge = CTRACKER_BASE_URL + "event_listener_guage.js",
      ctrackerTemplate = CTRACKER_BASE_URL + "ctracker_template.js",
      jqueryTemplate = CTRACKER_BASE_URL + "jquery.tmpl.min.js",
      tags = CTRACKER_BASE_URL + "tags.min.js";

  require([jquery, highCharts], function() {
    require([jqueryTemplate, ctrackerTemplate, tags], function(){
      $('#closure-tracker-main-panel p').click(function() {
        $('#closure-tracker-expanded-panel').toggle();
      });
      $('#closure-tracker-expanded-panel').show();

      $.tmpl('mainPanel').appendTo('#closure-tracker-expanded-panel');
      $(document).ready(function(){
        $('#textarea').textext({ plugins : 'tags' });
      });
      require([eventGauge], function() {});
      require([eventChart], function() {});
    });
  });
}());
