define([], function () {

  var eventCount = 0,
    eventAggregator = {},
    originalFireListener, fireEventCallBack;

  originalFireListener = goog.events.fireListener;
  goog.events.fireListener = function() {

    var listener, eventObject, eventType, currentEvent;

    eventCount += 1;
    listener = arguments[0];
    eventObject = arguments[1];
    eventType = eventObject.type.toString();

    currentEvent = {
      origin: eventObject,
      target: eventObject.target,
      name: eventType
    };
    if (!eventAggregator[eventType]) {
      eventAggregator[eventType] = 0;
    }
    eventAggregator[eventType] += 1;

    if(fireEventCallBack) {
      fireEventCallBack(currentEvent);
    }

    return originalFireListener.apply(this, arguments);
  };

  return {
    getCount: function () {
      return eventCount;
    },
    clearCount: function () {
      eventCount = 0;
    },
    getAggregatedEventData: function () {
      return eventAggregator;
    },
    setFireEventCallBack: function(callback) {
      fireEventCallBack = callback;
    }
  };
});
