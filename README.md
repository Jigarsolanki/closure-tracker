Closure Tracker
==============

Closure Tracker is a google chrome plugin which provides real-time graphs and information about Javascript
events that are being fired. It is meant for use with the Google Closure Javascript library.

## Installation Notes

First clone the repository

```
git clone git://github.com/Jigarsolanki/closure-tracker.git
```

After that install the plugin for chrome by going to

* Settings > Extensions 
* Enable 'Developer Mode'
* Load unpacked extension
* Browse to where you cloned the repository and select the chrome-extension folder
(NOT the chrome-extension-development folder)

The tracker will now be enabled for any site you visit from 127.0.0.1 or localhost

## Description of Project

-- Insert screenshot of event tracker here to explain --

### Events Per Second Gauge

This is a measure of events that are firing RIGHT NOW. It provides an idea of just how many events got fired in a very short timespan (seconds).
The idea is similar to a steam engine hitting a tipping point in how much energy it is expending at that exact moment

### Registered Event Listeners Realtime Linegraph

This graph is continuously updated with the current count of event listeners on the page.
Anytime listeners increase or decrease it will be reflected here.

### Total Events Fired

The barchart here shows all event types that have been fired and the count of how many times they have been fired.

### Event Logger

The event logger stores the last 200 events that have been fired and the name of the event. An input box is present allowing 
one to exclude events by typing in an event name they don't want to see in the logger anymore.

Clicking on an event in the logger will output the entire event to the google chrome console
(we attempted to do this in the toolbar but this proved to be a simpler and faster solution)