(function() {

  var oListen, oUnlistenByKey, oFireListener;

  oListen = goog.events.listen;
  goog.events.listen = function() {
    oListen.apply(this, arguments);
    console.log('Event Listeners Increased To:' + goog.events.getTotalListenerCount());
  };

  oUnlistenByKey = goog.events.unlistenByKey;
  goog.events.unlistenByKey = function() {
    oUnlistenByKey.apply(this, arguments);
    console.log('Event Listeners Descreased To:' + goog.events.getTotalListenerCount());
  };

  oFireListener = goog.events.fireListener;
  goog.events.fireListener = function() {
    var listener, eventObject;
    listener = arguments[0];
    eventObject = arguments[1];
    if (!eventObject.getBrowserEvent) {
      console.log(listener, eventObject);
    }
    return oFireListener.apply(this, arguments);
  };
}());
