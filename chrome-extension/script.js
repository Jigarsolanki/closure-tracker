var script, style, templates, mainPanelElement, expandedPanelElement, titleElement;

style = document.createElement('link');
style.setAttribute('href', '/site_media/css/closure_tracker.css');
style.setAttribute('rel', 'stylesheet');
style.setAttribute('type', 'text/css');
document.body.appendChild(style);

templates = document.createElement('script');
templates.src = '/site_media/js/ck/templates/ctracker_templates.js';
document.body.appendChild(templates);

script = document.createElement('script');
script.src = '/site_media/js/closure_tracker.js';
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
