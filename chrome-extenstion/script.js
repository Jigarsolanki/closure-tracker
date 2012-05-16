var script, style, mainPanelElement;

script = document.createElement('script');
script.src = '/site_media/js/closure_tracker.js';
document.body.appendChild(script);

style = document.createElement('link');
style.setAttribute('href', '/site_media/css/closure_tracker.css');
style.setAttribute('rel', 'stylesheet');
style.setAttribute('type', 'text/css');
document.body.appendChild(style);

mainPanelElement = document.createElement('div');
mainPanelElement.id = "closure-tracker-main-panel";
document.body.appendChild(mainPanelElement);
