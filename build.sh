#!/bin/bash

node r.js -o  name=main out=./dist/ctracker_dist.js  mainConfigFile=./config.js paths.requireLib=scripts/require include=requireLib
cp chrome-extension-development/ctracker.css chrome-extension/ctracker.css
zip dist/closure-tracker chrome-extension/*
