var CTRACKER_BASE_URL = "http://127.0.0.1:8585/";

(function() {
  var jquery = CTRACKER_BASE_URL + "scripts/jquery.min.js",
      highcharts = CTRACKER_BASE_URL + "scripts/highcharts.min.js";

  require([jquery, highcharts], function() {
    $('#closure-tracker-main-panel').click(function() {
      $('#closure-tracker-expanded-panel').toggle();
    });
  });
}());
