define([], function () {

  var eventCount = 0,
    originalFireListener;

  originalFireListener = goog.events.fireListener;
    goog.events.fireListener = function() {
      eventCount += 1;
      return originalFireListener.apply(this, arguments);
    };


  return {
    getCount: function() {
      return eventCount;
    },
    clearCount: function(){
      eventCount = 0;
    }
  };
});
