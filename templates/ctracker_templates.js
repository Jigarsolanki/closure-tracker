// This file was automatically generated from templates.soy.
// Please don't edit this file by hand.

goog.provide('ctracker.templates');

goog.require('soy');
goog.require('soy.StringBuilder');


ctracker.templates.options_panel = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<span class="ctracker-clear-all">Clear All</span><span id="ctracker-listener-line"></span><span></span>');
  return opt_sb ? '' : output.toString();
};


ctracker.templates.event_panel = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div><div class="ctracker-event-aggregated"></div><div class="ctracker-event-activity"><div class="ctracker-event-activity-title">Click to view in console</div><div class="ctracker-event-activity-exclude"><input placeholder="Comma-delimited list to exclude..." /></div><div class="ctracker-event-activity-list"></div></div><div class="ctracker-eve"</div>');
  return opt_sb ? '' : output.toString();
};


ctracker.templates.event_output = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('** ', soy.$$escapeHtml(opt_data.singleEvent.name), ' ** was fired.');
  return opt_sb ? '' : output.toString();
};
