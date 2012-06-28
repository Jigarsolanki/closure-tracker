(function() {

  var oListen, oUnlistenByKey, oFireListener, eventAggregator,
    dependenciesLoaded, dependencyLoaderId, recentEvents, eventChart,
    eventListenerCount, gauge, eventCount, sparklineListenerMax, eventSparkline;

  eventAggregator = {};
  recentEvents = {};
  sparklineListenerMax = 10000;
  eventCount = 0;

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
      eventCount += 1;

      if (dependenciesLoaded) {
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
    data.push(['Type', 'Count']);
    goog.object.forEach(eventAggregator, function(value, key) {
      data.push([key,value]);
    });

    return data;
  }

  function renderAggregatedEvents() {

    var data = google.visualization.arrayToDataTable(getDataToDraw());

    var options = {
      width: 600, height: 325,
      vAxis: {title: 'Event Type',  titleTextStyle: {color: 'red'}}
    };

    eventChart.draw(data, options);
    setTimeout(renderAggregatedEvents, 500);
  };

  function renderEventSparklines() {
    var refreshinterval = 1000; // update display every 500ms
    var eventCount = [];
    var mpoints_max = 100;
    var mdraw = function() {

      var listenerCount = goog.events.getTotalListenerCount();

      eventCount.push([listenerCount]);
      if (eventCount.length > mpoints_max){
        eventCount.splice(0,1);
      }
      eventCount[0] = ["Total Listeners"];
      if(eventCount.length > 2){
        eventSparkline.draw(
          google.visualization.arrayToDataTable(eventCount), {
            height: 250,
            width : 250
          }
        );
      }

      setTimeout(mdraw, refreshinterval);
    }
    setTimeout(mdraw, refreshinterval);
  };


  function setUpGauge() {

    var gaugeElement;

    gaugeElement = goog.dom.getElementByClass(
      'ctracker-event-gauge');
    gauge = new google.visualization.Gauge(gaugeElement);
  }

  function setUpEventSparkline() {

    var eventSparklineElement;

    eventSparklineElement = goog.dom.getElement(
      'ctracker-listener-line');
    eventSparkline = new google.visualization.ImageSparkLine(eventSparklineElement);
  }

  function getGaugeDataToDraw() {

    var data;

    data = [];
    data = [
      ['Label', 'Value'],
      ['EPS', eventCount*2]
    ];
    eventCount = 0;
    return data;
  }

  function renderGaugeData() {

    var data = google.visualization.arrayToDataTable(getGaugeDataToDraw());

    var options = {
      width: 400, height: 120,
      redFrom: 90, redTo: 100,
      yellowFrom:75, yellowTo: 90,
      minorTicks: 1
    };
    gauge.draw(data, options);
    setTimeout(renderGaugeData, 500);
  };

  function startEPSgauge(){
    if(!gauge){
      setUpGauge();
      setTimeout(renderGaugeData, 500);
    }
  }

  function startEventChart(){
    if(!eventChart){
      setUpEventChart();
      setTimeout(renderAggregatedEvents, 500);
    }
  }

  function startSparkLines() {
    if(!eventSparkline){
      setUpEventSparkline();
      setTimeout(renderEventSparklines, 500);
    }
  }

  /**
   * PANEL SETUP GOES HERE
   */
  function togglePanel() {

    var expandedPanel, reachPageBody;

    expandedPanel = goog.dom.getElement('closure-tracker-expanded-panel');
    reachPageBody = goog.dom.getElement('page');
    isPanelShown = goog.style.isElementShown(expandedPanel);

    goog.dom.classes.enable(reachPageBody, 'ctracker-panel-padding',
      !isPanelShown);
    goog.style.showElement(expandedPanel,
      !isPanelShown);
  };

  function clearPanels() {

    var recentEventsPanel;

    eventAggregator = {ctracker_clear: 1};
    recentEvents = [];
    recentEventsPanel = goog.dom.getElementByClass('ctracker-event-activity-list');
    goog.dom.removeChildren(recentEventsPanel);
    eventChart.clearChart();
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

  function downloadGoogleDeps() {
    google.load('visualization', '1.0', {
      callback: function(){
        startEventChart();
        startEPSgauge();
        startSparkLines();
      },
      packages:['corechart', 'gauge', 'imagesparkline']});
  }

  /**
   * START OUR APP HERE.
   */
  dependencyLoaderId = setInterval(startApp, 1000);
  function startApp() {
    console.log('Closure Tracker -- Still Loading.');
    if (window.ctrackerFilesLoaded === 2) {
      clearInterval(dependencyLoaderId);
      goog.require('ctracker.templates');
      console.log('Closure Tracker -- Templates Loaded.');
      setup();
      console.log('Closure Tracker -- Loading Complete.');
      dependenciesLoaded = true;
      downloadGoogleDeps();
    }
  };
}());

