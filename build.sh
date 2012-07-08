#!/bin/bash

node r.js -o  name=main out=./dist/ctracker.js  mainConfigFile=./config.js paths.requireLib=scripts/require include=requireLib
cp chrome-extension-development/ctracker.css chrome-extension/ctracker.css
