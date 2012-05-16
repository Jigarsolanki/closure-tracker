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


  function togglePanel() {

    var expandedPanel, mainPanel, expanderButton, expandableMaxHeight,
      expandableHeightPlusBorder;

    expandableMaxHeight = 500;
    expandableHeightPlusBorder = expandableMaxHeight + 2;

    mainPanel = goog.dom.getElement('closure-tracker-main-panel');
    expanderButton = mainPanel.children[0];
    expandedPanel = mainPanel.children[1];

    if (goog.style.getSize(expandedPanel).height == expandableHeightPlusBorder) {
      goog.style.setHeight(expandedPanel, 0);
      return;
    }
    goog.style.setHeight(expandedPanel, expandableMaxHeight);
  };
  goog.events.listen(goog.dom.getElement('closure-tracker-main-panel'), goog.events.EventType.CLICK, togglePanel);
}());
