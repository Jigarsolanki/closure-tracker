(function() {

  var oListen, oUnlistenByKey, oFireListener, eventAggregator,
    dependenciesLoaded, dependencyLoaderId;

  eventAggregator = {};

  /**
   * OVERRIDE GOOGLE LIBRARIES TO TRACK THINGS
   */
  oListen = goog.events.listen;
  goog.events.listen = function() {
    return oListen.apply(this, arguments);
    //console.log('Event Listeners Increased To:' +
    //  goog.events.getTotalListenerCount());
  };

  oUnlistenByKey = goog.events.unlistenByKey;
  goog.events.unlistenByKey = function() {
    return oUnlistenByKey.apply(this, arguments);
    //console.log('Event Listeners Descreased To:' +
    //  goog.events.getTotalListenerCount());
  };

  oFireListener = goog.events.fireListener;
  goog.events.fireListener = function() {

    var listener, eventObject, eventType, eventNode, aggregatedEventNode;

    listener = arguments[0];
    eventObject = arguments[1];
    eventType = eventObject.type;

    if (!eventObject.getBrowserEvent) {

      if (!eventAggregator[eventType]) {
        eventAggregator[eventType] = {
          count: 0,
          name: eventType.toString()
        };
      }
      eventAggregator[eventType].count += 1;
    }

    if (dependenciesLoaded) {
      aggregatedEventNode = goog.dom.getElementByClass(
        'ctracker-event-aggregated');
      aggregatedEventNode.innerHTML = ctracker.templates.aggregated_events({
        aggregatedEvents: goog.object.getValues(eventAggregator)
      });

      eventNode = goog.dom.createElement('div');
      goog.dom.setTextContent(
        eventNode,
        ctracker.templates.event_output({
          singleEvent: {
            type: eventType,
            target: eventObject.target.toString(),
            name: eventType.toString()
          }
        })
      );
      goog.dom.insertChildAt(
        goog.dom.getElementByClass('ctracker-event-activity'),
        eventNode,
        0
      );
    }
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

    goog.events.listen(goog.dom.getElement('ctracker-options-panel'),
      goog.events.EventType.CLICK,
      clearPanels);

    eventPanel = goog.dom.createElement('div');
    eventPanel.id = 'ctracker-event-panel';
    eventPanel.innerHTML = ctracker.templates.event_panel({});
    goog.dom.appendChild(goog.dom.getElement('closure-tracker-expanded-panel'),
      eventPanel);

    goog.events.listen(goog.dom.getElement('closure-tracker-main-panel').children[0],
      goog.events.EventType.CLICK,
      togglePanel);
  };

  /**
   * START OUR APP HERE.
   */
  dependencyLoaderId = setInterval(startApp, 1000);
  function startApp() {
    console.log('Closure Tracker -- Still Loading.')
    if (window.ctrackerTemplatesLoaded) {
      console.log('Closure Tracker -- Templates Loaded.')
      clearInterval(dependencyLoaderId);
      dependenciesLoaded = true;
      goog.require('ctracker.templates');
      setup();
      console.log('Closure Tracker -- Loading Complete.')
    }
  };
}());

