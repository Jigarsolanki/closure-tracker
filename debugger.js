(function(){

  var oListen, oUnlistenByKey;

  oListen = goog.events.listen;
  goog.events.listen = function () {
    oListen.apply(this, arguments);
    console.log("Event Listeners Increased To:" + goog.events.getTotalListenerCount());
  };

 oUnlistenByKey = goog.events.unlistenByKey;
  goog.events.unlistenByKey = function () {
    oUnlistenByKey.apply(this, arguments);
    console.log("Event Listeners Descreased To:" + goog.events.getTotalListenerCount());
  };
}())
