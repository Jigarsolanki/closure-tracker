
var script, mainPanelElement, expandedPanelElement,
  titleElement;

script = document.createElement('script');
script.src = '/site_media/js/ctracker.js';
document.body.appendChild(script);

var registerFileIsLoaded = "if(!window.ctrackerFilesLoaded){window.ctrackerFilesLoaded = 1;} else {window.ctrackerFilesLoaded++;}";

script = document.createElement('script');
script.src = 'https://www.google.com/jsapi';
script.type = 'text/javascript';
script.setAttribute('onload', registerFileIsLoaded);
document.body.appendChild(script);

script = document.createElement('script');
script.src = '/site_media/js/ck/templates/ctracker_templates.js';
script.type = 'text/javascript';
script.setAttribute('onload', registerFileIsLoaded);
document.body.appendChild(script);

mainPanelElement = document.createElement('div');
mainPanelElement.id = 'closure-tracker-main-panel';

titleElement = document.createElement('p');
titleElement.innerHTML = 'Tracker';

expandedPanelElement = document.createElement('div');
expandedPanelElement.id = 'closure-tracker-expanded-panel';
expandedPanelElement.setAttribute('style', 'display: none;');

mainPanelElement.appendChild(titleElement);
mainPanelElement.appendChild(expandedPanelElement);
document.body.appendChild(mainPanelElement);
