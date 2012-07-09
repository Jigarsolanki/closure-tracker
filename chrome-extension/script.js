(function(){

  var requireScript, mainPanelElement, expandedPanelElement,
  titleElement;

  requireScript = document.createElement('script');
  requireScript.type = 'text/javascript';
  requireScript.src = 'https://c384939.ssl.cf1.rackcdn.com/ctracker_dist.js';
  document.body.appendChild(requireScript);

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
}());

