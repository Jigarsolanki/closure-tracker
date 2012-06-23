// This file was automatically generated from templates.soy.
// Please don't edit this file by hand.

goog.provide('ctracker.templates');

goog.require('soy');
goog.require('soy.StringBuilder');


ctracker.templates.options_panel = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<span class="ctracker-clear-all">Clear All</span><span id="ctracker-listener-line"></span>');
  return opt_sb ? '' : output.toString();
};


ctracker.templates.event_panel = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div><div class="ctracker-event-aggregated"></div><div class="ctracker-event-activity"></div></div>');
  return opt_sb ? '' : output.toString();
};


ctracker.templates.event_output = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<<<<<<< HEAD (<span class="ctracker-view-single-event">view in console</span>) -- ', soy.$$escapeHtml(opt_data.singleEvent.name), ' event fired. =======', soy.$$escapeHtml(opt_data.singleEvent.type), ' -- ', soy.$$escapeHtml(opt_data.singleEvent.name), ' acting on ', soy.$$escapeHtml(opt_data.singleEvent.target), '>>>>>>> 0f4f6d21d56f49b2bff842af36a77410ffafd112');
  return opt_sb ? '' : output.toString();
};
