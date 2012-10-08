define(['fireEventTracker', 'jquery', 'tags'], function(fireEventTracker) {

  var LOGGING_LIMIT = 200,
    removeOverFlowedLogs, fireEventHandler, init, clear,
    eventLogs = 0;

  resizeLogDiv = function() {

    var newHeight;

    newHeight = 190 - $('.text-core').height();
    $('#ctracker-event-logs-container').css('height', newHeight + 'px');
  };

  removeOverFlowedLogs = function () {
    if(eventLogs > LOGGING_LIMIT) {
      $('#ctracker-event-logger li:last-child').remove();
      eventLogs--;
    }
  };

  addNewLog = function(currentEvent) {

    var newEvent, exclusionList;

    exclusionList = [];
    $('#ctracker-event-logger .text-label').each(function(index, value) {
      exclusionList.push($(value).text());
    });

    if ($.inArray(currentEvent.name, exclusionList) === -1) {
      newEvent = $.tmpl('eventLog', [{
         Name: currentEvent.name
      }]);
      newEvent.prependTo('#ctracker-event-logs');
      newEvent.click(function() {
        var stackHtml = $.tmpl('stacktrace', [{
          eventOrigin: currentEvent.origin.type,
          trace: currentEvent.stacktrace
        }]);
        $('#ctracker-event-stacktrace').html(stackHtml);
      });
      eventLogs++;
    }
  };

  fireEventHandler = function(currentEvent) {
    addNewLog(currentEvent);
    removeOverFlowedLogs();
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

  clear = function () {
    $('#ctracker-event-logs').empty();
    eventLogs = 0;
  };

  fireEventTracker.setFireEventCallBack(fireEventHandler);

  return {
    clear: clear
  }
});

