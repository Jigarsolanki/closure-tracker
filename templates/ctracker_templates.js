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
  output.append('<div><table><tr><th>Name</th><th>Count</th></tr>');
  var eList6 = opt_data.aggregatedEvents;
  var eListLen6 = eList6.length;
  for (var eIndex6 = 0; eIndex6 < eListLen6; eIndex6++) {
    var eData6 = eList6[eIndex6];
    output.append('<tr><td>', soy.$$escapeHtml(eData6.name), '</td><td>', soy.$$escapeHtml(eData6.count), '</td></tr>');
  }
  output.append('</table></div>');
  return opt_sb ? '' : output.toString();
};


ctracker.templates.event_output = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append(soy.$$escapeHtml(opt_data.singleEvent.type), ' -- ', soy.$$escapeHtml(opt_data.singleEvent.name), ' acting on ', soy.$$escapeHtml(opt_data.singleEvent.target));
  return opt_sb ? '' : output.toString();
};
