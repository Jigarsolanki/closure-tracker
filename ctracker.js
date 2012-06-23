(function() {

  var oListen, oUnlistenByKey, oFireListener, eventAggregator,
    dependenciesLoaded, dependencyLoaderId, recentEvents, eventChart,
    eventListenerCount;

  eventAggregator = {};
  recentEvents = {};

  // /**
  //  * OVERRIDE GOOGLE LIBRARIES TO TRACK THINGS
  //  */
  // oListen = goog.events.listen;
  // goog.events.listen = function() {

  //   if (dependenciesLoaded) {

  //     var listenerCountElement;

  //     listenerCountElement = goog.dom.getElementByClass(
  //       'ctracker-listener-count');
  //     goog.dom.setTextContent(listenerCountElement,
  //       goog.events.getTotalListenerCount());
  //   }
  //   return oListen.apply(this, arguments);
  // };

  // oUnlistenByKey = goog.events.unlistenByKey;
  // goog.events.unlistenByKey = function() {

  //   if (dependenciesLoaded) {

  //     var listenerCountElement;

  //     listenerCountElement = goog.dom.getElementByClass(
  //       'ctracker-listener-count');
  //     goog.dom.setTextContent(listenerCountElement,
  //       goog.events.getTotalListenerCount());
  //   }
  //   return oUnlistenByKey.apply(this, arguments);
  // };

  oFireListener = goog.events.fireListener;
  goog.events.fireListener = function() {

    var listener, eventObject, eventType, currentEvent;

    listener = arguments[0];
    eventObject = arguments[1];
    eventType = eventObject.type;

    if (!eventObject.getBrowserEvent) {

      currentEvent = {
        target: eventObject.target,
        name: eventType.toString()
      };

      if (!eventAggregator[eventType.toString()]) {
        eventAggregator[eventType.toString()] = 0;
      }
      eventAggregator[eventType] += 1;

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

    var singleEventElement, eventActivityElement, id, eventHandler,
      exclusionList, exclusionListInput;

    eventActivityElement = goog.dom.getElementByClass(
      'ctracker-event-activity-list');

    limitEventActivity(2000);

    exclusionList = [];
    exclusionListInput = goog.dom.getElementByClass(
      'ctracker-event-activity-exclude').children[0];
    if (goog.dom.forms.getValue(exclusionListInput) !==
      'Comma-delimited list to exclude...') {
      exclusionList = goog.dom.forms.getValue(exclusionListInput).split(',');
    }

    if (!goog.array.contains(exclusionList, currentEvent.name)) {
      singleEventElement = goog.dom.createElement('div');
      singleEventElement.innerHTML = ctracker.templates.event_output({
        singleEvent: currentEvent
      });

      id = 'ctracker-' + goog.getUid(currentEvent.target);
      singleEventElement.closure_id = id;
      recentEvents[id] = currentEvent.target;

      eventHandler = new goog.events.EventHandler();
      eventHandler.listen(
        singleEventElement,
        goog.events.EventType.CLICK,
        function() {
          console.log(currentEvent.target);
        },
        undefined,
        this
      );
      eventHandler.registerDisposable(singleEventElement);

      goog.dom.insertChildAt(
        eventActivityElement,
        singleEventElement,
        0
      );
    }
  };

  function limitEventActivity(maximum) {

    var x, eventActivityElement, id;

    maximum = maximum || 200;

    eventActivityElement = goog.dom.getElementByClass(
      'ctracker-event-activity-list');
    if (eventActivityElement.children.length > 200) {

      x = eventActivityElement.children.length - 1;
      for (x; x > maximum; x--) {
        id = eventActivityElement.children[x].closure_id;
        if (goog.dom.query('closure_id=' + id, eventActivityElement).length === 0) {
          delete recentEvents[id];
        }
        goog.dom.removeNode(eventActivityElement.children[x]);
      }
    }
  };

  function setUpEventChart() {

    var aggregatedEventElement;

    aggregatedEventElement = goog.dom.getElementByClass(
      'ctracker-event-aggregated');
    eventChart = new google.visualization.BarChart(aggregatedEventElement);
  }

  function getDataToDraw() {

    var data;

    data = [];
    data.push(['Type', 'Times']);
    goog.object.forEach(eventAggregator, function(value, key) {
      data.push([key,value]);
    });

    return data;
  }

  function renderAggregatedEvents() {

    var data = google.visualization.arrayToDataTable(getDataToDraw());

    var options = {
      title: 'Events',
      vAxis: {title: 'EVent Type',  titleTextStyle: {color: 'red'}}
    };

    if(eventChart){
      eventChart.draw(data, options);
    } else {
      setUpEventChart();
      renderAggregatedEvents();
    }
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

    var recentEventsPanel;

    eventAggregator = {ctracker_clear: 1};
    recentEvents = [];
    recentEventsPanel = goog.dom.getElementByClass('ctracker-event-activity-list');
    goog.dom.removeChildren(recentEventsPanel);
    renderAggregatedEvents();
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

    setInterval(limitEventActivity, 10000);
  };

  function doGoogleShit() {
    if (window['google'] != undefined && window['google']['loader'] != undefined) {
      if (!window['google']['visualization']) {
      window['google']['visualization'] = {};
      google.visualization.Version = '1.0';
      google.visualization.JSHash = 'b8ead078cfbbc014864e12c526655941';
      google.visualization.LoadArgs = 'file\75visualization\46v\0751\46packages\75corechart';
      }
      google.loader.writeLoadTag("script", google.loader.ServiceBase + "/api/visualization/1.0/b8ead078cfbbc014864e12c526655941/format+en,default,corechart.I.js", true);
    }
  }

  function setUpSparklinesForEventListeners() {
    var mrefreshinterval = 500; // update display every 500ms
    var mpoints = [];
    var mpoints_max = 25;
    var mdraw = function() {

      mpoints.push(goog.events.getTotalListenerCount());
      if (mpoints.length > mpoints_max){
        mpoints.splice(0,1);
      }
      mousetravel = 0;
      console.log(mpoints.length*2);
      $('#ctracker-listener-line').sparkline(mpoints, {
        width: mpoints.length*2,
        tooltipSuffix: ' total listeners'
      });

      setTimeout(mdraw, mrefreshinterval);
    }
    setTimeout(mdraw, mrefreshinterval);
  };


  /**
   * START OUR APP HERE.
   */
  dependencyLoaderId = setInterval(startApp, 1000);
  function startApp() {
    console.log('Closure Tracker -- Still Loading.');
    if (window.ctrackerFilesLoaded === 4) {
      clearInterval(dependencyLoaderId);
      goog.require('ctracker.templates');
      console.log('Closure Tracker -- Templates Loaded.');
      setup();
      console.log('Closure Tracker -- Loading Complete.');
      dependenciesLoaded = true;
      doGoogleShit();
      setUpSparklinesForEventListeners();
    }
  };
}());

