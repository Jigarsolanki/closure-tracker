// This file was automatically generated from templates.soy.
// Please don't edit this file by hand.

goog.provide('ctracker.templates');

goog.require('soy');
goog.require('soy.StringBuilder');


ctracker.templates.event_panel = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div><div class="ctracker-event-aggregated"></div><div class="ctracker-event-activity"></div></div>');
  return opt_sb ? '' : output.toString();
};


ctracker.templates.aggregated_events = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  var eList5 = opt_data.aggregatedEvents;
  var eListLen5 = eList5.length;
  for (var eIndex5 = 0; eIndex5 < eListLen5; eIndex5++) {
    var eData5 = eList5[eIndex5];
    output.append('<div><h3>', soy.$$escapeHtml(eData5.name), ' (', soy.$$escapeHtml(eData5.count), ')</h3></div>');
  }
  return opt_sb ? '' : output.toString();
};


ctracker.templates.event_output = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append(soy.$$escapeHtml(opt_data.singleEvent.type), ' -- ', soy.$$escapeHtml(opt_data.singleEvent.name), ' acting on ', soy.$$escapeHtml(opt_data.singleEvent.target));
  return opt_sb ? '' : output.toString();
};
