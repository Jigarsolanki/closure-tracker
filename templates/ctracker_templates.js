// This file was automatically generated from templates.soy.
// Please don't edit this file by hand.

goog.provide('ctracker.templates');

goog.require('soy');
goog.require('soy.StringBuilder');


ctracker.templates.options_panel = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<span class="ctracker-clear-all">Clear All</span>');
  return opt_sb ? '' : output.toString();
};


ctracker.templates.event_panel = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<table><tr><td><div class="ctracker-event-aggregated"></div></td><td><div class="ctracker-event-activity"><div class="ctracker-event-activity-title">Click to view in console</div><div class="ctracker-event-activity-exclude"><input placeholder="Comma-delimited list to exclude..." /></div><div class="ctracker-event-activity-list"></div></div></td><td class="ctracker-event-activity-gauge"><span>Event Listener Monitoring</span><span class="ctracker-event-activity-gauge" id="ctracker-listener-line">Loading...</span><span class="eps-label">Events Per Seconds</span><div class="ctracker-event-gauge"></div></tr></table>');
  return opt_sb ? '' : output.toString();
};


ctracker.templates.event_output = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('** ', soy.$$escapeHtml(opt_data.singleEvent.name), ' ** was fired.');
  return opt_sb ? '' : output.toString();
};
