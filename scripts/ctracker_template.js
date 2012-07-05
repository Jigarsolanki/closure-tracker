(function() {
  var jquery = CTRACKER_BASE_URL + "deps/jquery.min.js",
      jqueryTemplate = CTRACKER_BASE_URL + "deps/jquery.tmpl.min.js";

  require([jquery, jqueryTemplate], function() {
    $.template('mainPanel',
      '<canvas id="ctracker-events-per-second-gauge"></canvas>'+
      '<div id="ctracker-controls" >' +
        '<button id="ctracker-clear-all">Reset</button>' +
      '</div>' +
      '<div id="ctracker-event-listener-chart-container">' +
        '<div id="ctracker-event-listener-chart"></div>'+
      '</div>' +
      '<div id="ctracker-event-type-chart"></div>' +
      '<div id="ctracker-event-logger">' +
        '<textarea rows="1"></textarea>' +
        '<div id="ctracker-event-logs-container">' +
          '<ul id="ctracker-event-logs"></ul>' +
        '</div>'+
      '</div>'
     );

    $.template( "eventLog", '<li><b>${Name}</b></li>' );
  });
}());
