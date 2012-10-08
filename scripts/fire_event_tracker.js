define(['stacktrace'], function () {

  var eventCount = 0,
    eventAggregator = {},
    originalFireListener, fireEventCallBack;

  originalFireListener = goog.events.fireListener;
  goog.events.fireListener = function() {

    var listener, eventObject, eventType, currentEvent, RELEVANT_STACK_SLICE;

    RELEVANT_STACK_SLICE = 6;

    listener = arguments[0];
    eventObject = arguments[1];

    if (canTrackEvent(eventObject) && $('#closure-tracker-expanded-panel:hidden').length != 1) {
      eventCount += 1;
      eventType = eventObject.type.toString();

      currentEvent = {
        origin: eventObject,
        target: eventObject.target,
        name: eventType,
        stacktrace: printStackTrace().slice(RELEVANT_STACK_SLICE)
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
