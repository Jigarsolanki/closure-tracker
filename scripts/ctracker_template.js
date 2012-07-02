(function() {
  var jquery = CTRACKER_BASE_URL + "jquery.min.js",
      jqueryTemplate = CTRACKER_BASE_URL + "jquery.tmpl.min.js";

  require([jquery, jqueryTemplate], function() {
    $.template('mainPanel',
      '<canvas id="ctracker-events-per-second-gauge"></canvas>'+
      '<div id="ctracker-event-listener-chart"></div>');
  });
}());
