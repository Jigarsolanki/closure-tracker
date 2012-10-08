(function() {

  require(['jquery', 'jqueryTemplate'], function() {
    $.template('mainPanel',
      '<canvas id="ctracker-events-per-second-gauge"></canvas>'+
      '<div id="ctracker-controls" >' +
        '<button id="ctracker-clear-all">Reset</button>' +
        '<div>' +
          '<input type="checkbox" id="ctracker-enable-browser-event-option">' +
          '<label for="ctracker-enable-browser-event-option">Enable browser events</label>' +
        '</div>' +
      '</div>' +
      '<div id="ctracker-event-listener-chart-container">' +
        '<div id="ctracker-event-listener-chart"></div>'+
      '</div>' +
      '<div id="ctracker-event-type-chart"></div>' +
      '<div id="ctracker-event-logger">' +
        '<textarea rows="1"></textarea>' +
        '<div id="ctracker-event-logs-container">' +
          '<ul id="ctracker-event-logs"></ul>' +
        '</div>' +
      '</div>' +
      '<div id="ctracker-event-stacktrace"></div>'
     );

    $.template( 'eventLog', '<li><b>${Name}</b></li>' );

    $.template(
      'stacktrace',
      '<h2>${eventOrigin} Stack Trace</h2>' +
      '<ul>' +
      '{{each trace}}' +
        '<li>${$value}</li>' +
      '{{/each}}' +
      '</ul>'
    );
  });
}());
