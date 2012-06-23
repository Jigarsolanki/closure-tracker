// This file was automatically generated from templates.soy.
// Please don't edit this file by hand.

goog.provide('ctracker.templates');

goog.require('soy');
goog.require('soy.StringBuilder');


ctracker.templates.options_panel = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<span class="ctracker-listener-count"></span><span class="ctracker-clear-all">Clear All</span>');
  return opt_sb ? '' : output.toString();
};


ctracker.templates.event_panel = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div><div class="ctracker-event-aggregated"></div><div class="ctracker-event-activity"></div></div>');
  return opt_sb ? '' : output.toString();
};


ctracker.templates.aggregated_events = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div><table><tr><th>Name</th><th>Count</th></tr>');
  var eList8 = opt_data.aggregatedEvents;
  var eListLen8 = eList8.length;
  for (var eIndex8 = 0; eIndex8 < eListLen8; eIndex8++) {
    var eData8 = eList8[eIndex8];
    output.append('<tr><td>', soy.$$escapeHtml(eData8.name), '</td><td>', soy.$$escapeHtml(eData8.count), '</td></tr>');
  }
  output.append('</table></div>');
  return opt_sb ? '' : output.toString();
};


ctracker.templates.event_output = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('(<span class="ctracker-view-single-event" onClick="console.log(this);">view in console</span>) -- ', soy.$$escapeHtml(opt_data.singleEvent.name), ' event fired.');
  return opt_sb ? '' : output.toString();
};
