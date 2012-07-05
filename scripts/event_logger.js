(function() {
  var jquery = CTRACKER_BASE_URL + "deps/jquery.min.js",
      jqTemplate = CTRACKER_BASE_URL + "deps/jquery.tmpl.min.js",
      tags = CTRACKER_BASE_URL + "deps/tags.min.js",
      fireEventTracker = CTRACKER_BASE_URL + "fire_event_tracker.js";

  require([fireEventTracker, jquery, jqTemplate, tags], function(
    fireEventTracker) {

    var LOGGING_LIMIT = 200,
      removeOverFlowedLogs, fireEventHandler,
      eventLogs = 0;

    resizeLogDiv = function() {

      var newHeight;

      newHeight = 190 - $('.text-core').height();
      $('#ctracker-event-logs-container').css('height', newHeight + 'px');
    };

    $('#ctracker-event-logger textarea').textext({
      plugins : 'tags',
      ext: {
        tags: {
          addTags: function(tags)
          {
            $.fn.textext.TextExtTags.prototype.addTags.apply(this, arguments);
            resizeLogDiv();
          },
          removeTag: function(tag)
          {
            $.fn.textext.TextExtTags.prototype.removeTag.apply(this, arguments);
            resizeLogDiv();
          }
        }
      }
    });

    removeOverFlowedLogs = function () {
      if(eventLogs > LOGGING_LIMIT) {
        $('#ctracker-event-logger li:last-child').remove();
        eventLogs--;
      }
    };

    addNewLog = function(currentEvent) {

      var newEvent;

      newEvent = $.tmpl('eventLog', [{
         Name: currentEvent.name
      }]);
      newEvent.prependTo('#ctracker-event-logs');
      newEvent.click(function() {
        console.log(currentEvent.origin);
      });
      eventLogs++;
    };

    fireEventHandler = function(currentEvent) {
      addNewLog(currentEvent);
      removeOverFlowedLogs();
    };

    fireEventTracker.setFireEventCallBack(fireEventHandler);

    // $.tmpl('eventLog', [{
    //   Name: "asfasfasdf"
    // }]).appendTo('#ctracker-event-logs');
  });
}());

