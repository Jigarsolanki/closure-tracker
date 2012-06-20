(function() {

  var oListen, oUnlistenByKey, oFireListener, eventAggregator,
    dependenciesLoaded, dependencyLoaderId;

  eventAggregator = {};

  /**
   * OVERRIDE GOOGLE LIBRARIES TO TRACK THINGS
   */
  oListen = goog.events.listen;
  goog.events.listen = function() {

    if (dependenciesLoaded) {

      var listenerCountElement;

      listenerCountElement = goog.dom.getElementByClass(
        'ctracker-listener-count');
      goog.dom.setTextContent(listenerCountElement,
        goog.events.getTotalListenerCount());
    }
    return oListen.apply(this, arguments);
  };

  oUnlistenByKey = goog.events.unlistenByKey;
  goog.events.unlistenByKey = function() {

    if (dependenciesLoaded) {

      var listenerCountElement;

      listenerCountElement = goog.dom.getElementByClass(
        'ctracker-listener-count');
      goog.dom.setTextContent(listenerCountElement,
        goog.events.getTotalListenerCount());
    }
    return oUnlistenByKey.apply(this, arguments);
  };

  oFireListener = goog.events.fireListener;
  goog.events.fireListener = function() {

    var listener, eventObject, eventType, currentEvent;

    listener = arguments[0];
    eventObject = arguments[1];
    eventType = eventObject.type;

    if (!eventObject.getBrowserEvent) {

      currentEvent = {
        type: eventType,
        target: eventObject.target.toString(),
        name: eventType.toString()
      };

      if (!eventAggregator[eventType]) {
        eventAggregator[eventType] = {
          count: 0,
          name: eventType.toString()
        };
      }
      eventAggregator[eventType].count += 1;

      if (dependenciesLoaded) {
        renderAggregatedEvents();
        renderSingleEvent(currentEvent);
      }
    }
    return oFireListener.apply(this, arguments);
  };

  /**
   * RENDERING FUNCTIONALITY FOR EVENTS
   */
  function renderSingleEvent(currentEvent) {

    var singleEventElement;

    singleEventElement = goog.dom.createElement('div');
    goog.dom.setTextContent(
      singleEventElement,
      ctracker.templates.event_output({
        singleEvent: currentEvent
      })
    );
    goog.dom.insertChildAt(
      goog.dom.getElementByClass('ctracker-event-activity'),
      singleEventElement,
      0
    );
  };

  function renderAggregatedEvents() {

    var aggregatedEventElement;

    aggregatedEventElement = goog.dom.getElementByClass(
      'ctracker-event-aggregated');
    aggregatedEventElement.innerHTML = ctracker.templates.aggregated_events({
      aggregatedEvents: goog.object.getValues(eventAggregator)
    });
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

  function clearPanels() {

    var eventPanel;

    eventPanel = goog.dom.getElement('ctracker-event-panel');
    eventPanel.innerHTML = ctracker.templates.event_panel({});
    eventAggregator = {};
  }

  function setup() {

    var eventPanel, optionsPanel;

    optionsPanel = goog.dom.createElement('div');
    optionsPanel.id = 'ctracker-options-panel';
    optionsPanel.innerHTML = ctracker.templates.options_panel({});
    goog.dom.appendChild(goog.dom.getElement('closure-tracker-expanded-panel'),
      optionsPanel);

    goog.events.listen(goog.dom.getElementByClass('ctracker-clear-all'),
      goog.events.EventType.CLICK,
      clearPanels);

    eventPanel = goog.dom.createElement('div');
    eventPanel.id = 'ctracker-event-panel';
    eventPanel.innerHTML = ctracker.templates.event_panel({});
    goog.dom.appendChild(goog.dom.getElement('closure-tracker-expanded-panel'),
      eventPanel);

    goog.events.listen(
      goog.dom.getElement('closure-tracker-main-panel').children[0],
      goog.events.EventType.CLICK,
      togglePanel
    );

    renderAggregatedEvents();
  };

  /**
   * START OUR APP HERE.
   */
  dependencyLoaderId = setInterval(startApp, 1000);
  function startApp() {
    console.log('Closure Tracker -- Still Loading.');
    if (window.ctrackerTemplatesLoaded) {
      clearInterval(dependencyLoaderId);
      goog.require('ctracker.templates');
      console.log('Closure Tracker -- Templates Loaded.');
      setup();
      console.log('Closure Tracker -- Loading Complete.');
      dependenciesLoaded = true;
    }
  };
}());

