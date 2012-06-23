window.ctrackerTemplatesLoaded = false;

var script, templates, mainPanelElement, expandedPanelElement,
  titleElement;

script = document.createElement('script');
script.src = '/site_media/js/ctracker.js';
document.body.appendChild(script);

script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js';
document.body.appendChild(script);


templates = document.createElement('script');
templates.src = '/site_media/js/ck/templates/ctracker_templates.js';
templates.type = 'text/javascript';
templates.setAttribute('onload', 'window.ctrackerTemplatesLoaded = true;');
document.body.appendChild(templates);

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
