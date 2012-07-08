(function() {
  require(['fireEventTracker', 'eventLogger', 'eventTypesChart'], function(
    fireEventTracker, eventLogger, eventTypesChart) {
    $('#ctracker-clear-all').click(function(){
      eventLogger.clear();
      fireEventTracker.clearAggregatedEventData();
      eventTypesChart.clear();
    });
  });
}());
