require.config({
  baseUrl: 'http://127.0.0.1:8585/scripts/'
});

require.config({
  paths:{
    'jquery': 'deps/jquery.min',
    'highCharts': 'deps/highcharts.min',
    'eventChart':'event_listener_chart',
    'eventGauge': 'event_listener_gauge',
    'ctrackerTemplate': 'template',
    'jqueryTemplate': 'deps/jquery.tmpl.min',
    'eventTypesChart': 'event_types_chart',
    'eventLogger': 'event_logger',
    'panelDisplayer': 'panel_displayer',
    'tags': 'deps/tags.min',
    'fireEventTracker': 'fire_event_tracker',
    'guage': 'deps/gauge.min',
    'jqGuage': 'deps/jquery.gauge',
    'reset': 'reset'
  }
});


(function() {
  require(['jquery', 'highCharts'], function () {
    require(['jqueryTemplate', 'ctrackerTemplate'], function () {
      $(document).ready(function() {
        require(['panelDisplayer'], function () {
          require(['eventGauge'], function() {});
          require(['eventChart'], function() {});
          require(['eventTypesChart'], function() {});
          require(['eventLogger'], function() {});
          require(['reset'], function() {});
        });
      });
    });
  });
}());
