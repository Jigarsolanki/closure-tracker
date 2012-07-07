(function() {

  var key = 'ctrackerDisplayFlag';

  $.tmpl('mainPanel').appendTo('#closure-tracker-expanded-panel');

  function toggleLocalStoreValue() {

    var flag;

    flag = localStorage.getItem(key);
    if(flag && flag === 'true')
    {
      localStorage.setItem(key, 'false');
    } else {
      localStorage.setItem(key, 'true');
    }
    console.log(localStorage.getItem(key))
  }

  function shouldShow() {

    var flag;

    flag = localStorage.getItem(key);
    return (flag && flag === 'true')
  }

  $('#closure-tracker-main-panel p').click(function() {
    $('#closure-tracker-expanded-panel').toggle();
    toggleLocalStoreValue();
  });

  if(shouldShow()) {
     $('#closure-tracker-expanded-panel').show();
  } else {
   $('#closure-tracker-expanded-panel').hide();
  }
}());
