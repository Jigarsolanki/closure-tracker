#!/bin/bash

java -jar SoyToJsSrcCompiler.jar --shouldProvideRequireSoyNamespaces --outputPathFormat ctracker_templates.js templates.soy
