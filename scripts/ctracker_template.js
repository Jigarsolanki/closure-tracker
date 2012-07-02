(function() {
  var jquery = CTRACKER_BASE_URL + "jquery.min.js",
      jqueryTemplate = CTRACKER_BASE_URL + "jquery.tmpl.min.js";

  require([jquery, jqueryTemplate], function() {
    $.template('mainPanel',
      '<canvas id="ctracker-events-per-second-gauge"></canvas>'+
      '<div id="ctracker-event-listener-chart-container">' +
        '<div id="ctracker-event-listener-chart"></div>'+
      '</div>' +
      '<div id="ctracker-event-logger">' +
        '<textarea id="textarea"  class="example" rows="1"></textarea>' +
      '</div>');
  });
}());
