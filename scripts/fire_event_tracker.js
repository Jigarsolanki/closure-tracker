define([], function () {

  var eventCount = 0,
    eventAggregator = {},
    originalFireListener, fireEventCallBack;

  originalFireListener = goog.events.fireListener;
  goog.events.fireListener = function() {

    var listener, eventObject, eventType, currentEvent;

    listener = arguments[0];
    eventObject = arguments[1];

    if (canTrackEvent(eventObject)) {
      eventCount += 1;
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

      if (fireEventCallBack) {
        fireEventCallBack(currentEvent);
      }
    }

    return originalFireListener.apply(this, arguments);
  };

  function isBrowserEvent(currentEvent) {
    return currentEvent.getBrowserEvent ? true : false;
  }

  function areBrowserEventsEnabled(currentEvent) {
    return $('#ctracker-enable-browser-event-option:checked').length === 1;
  }

  function canTrackEvent(currentEvent) {
    if (isBrowserEvent(currentEvent)) {
      return areBrowserEventsEnabled();
    }
    return true;
  }

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
    clearAggregatedEventData: function() {
      eventAggregator = {};
    },
    setFireEventCallBack: function(callback) {
      fireEventCallBack = callback;
    }
  };
});
