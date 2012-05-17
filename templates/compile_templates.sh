#!/bin/bash

java -jar ~/fun/closure-soy-compiler/SoyToJsSrcCompiler.jar --shouldProvideRequireSoyNamespaces --outputPathFormat ctracker_templates.js templates.soy
