goog.require('ctracker.templates');

(function() {

  var oListen, oUnlistenByKey, oFireListener, eventAggregator;

  eventAggregator = {};

  /**
   * OVERRIDE GOOGLE LIBRARIES TO TRACK THINGS
   */
  oListen = goog.events.listen;
  goog.events.listen = function() {
    oListen.apply(this, arguments);
    console.log('Event Listeners Increased To:' +
      goog.events.getTotalListenerCount());
  };

  oUnlistenByKey = goog.events.unlistenByKey;
  goog.events.unlistenByKey = function() {
    oUnlistenByKey.apply(this, arguments);
    console.log('Event Listeners Descreased To:' +
      goog.events.getTotalListenerCount());
  };

  oFireListener = goog.events.fireListener;
  goog.events.fireListener = function() {

    var listener, eventObject, eventType;

    listener = arguments[0];
    eventObject = arguments[1];
    eventType = eventObject.type;

    if (!eventObject.getBrowserEvent) {
      //console.log(listener, eventObject);

      if (!eventAggregator[eventType]) {
        eventAggregator[eventType] = {
          count: 0,
          target: eventObject.target.toString(),
          name: eventType.toString()
        };
      }
      eventAggregator[eventType].count += 1;
    }
    goog.dom.setTextContent(goog.dom.getElement('ctracker-aggregated-events'),
      ctracker.templates.event_panel({
        events: goog.object.getValues(eventAggregator)
      })
    );
    return oFireListener.apply(this, arguments);
  };


  /**
   * PANEL SETUP GOES HERE
   */
  function togglePanel() {

    var expandedPanel;

    expandedPanel = goog.dom.getElement('closure-tracker-expanded-panel');
    goog.style.showElement(expandedPanel,
      !goog.style.isElementShown(expandedPanel));
  };

  function setup() {

    var eventPanel;

    eventPanel = goog.dom.createElement('div');
    eventPanel.id = 'ctracker-aggregated-events';
    eventPanel.innerHTML = ctracker.templates.event_panel({});
    goog.dom.appendChild(goog.dom.getElement('closure-tracker-expanded-panel'),
      node);

    goog.events.listen(goog.dom.getElement('closure-tracker-main-panel'),
      goog.events.EventType.CLICK,
      togglePanel);
  };

  /**
   * START OUR APP HERE.
   */
  setup();

}());
