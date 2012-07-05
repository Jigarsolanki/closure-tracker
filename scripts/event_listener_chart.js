(function() {

  require([], function(theme) {

    var chart;

    Highcharts.setOptions({
      global: {
        useUTC: false
      }
    });

    chart = new Highcharts.Chart({
      chart: {
        renderTo: 'ctracker-event-listener-chart',
        type: 'spline',
        marginRight: 10,
        events: {
          load: function() {
            // set up the updating of the chart each second
            var series = this.series[0];
            setInterval(function() {
              var x = (new Date()).getTime(), // current time
                y = goog.events.getTotalListenerCount();
              series.addPoint([x, y], true, true);
            }, 1000);
          }
        }
      },
      title: {
        text: 'Current Registered EventListeners'
      },
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
      },
      yAxis: {
        title: {
          text: 'Listern Count'
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }]
      },
      tooltip: {
        formatter: function() {
          return '<b>'+ this.series.name +'</b><br/>'+
          Highcharts.numberFormat(this.y, 2);
        }
      },
      legend: {
        enabled: false
      },
      credits: {
          enabled: false
      },
      exporting: {
        enabled: false
      },
      series: [{
        name: 'Count',
        data: (function() {
          var data = [],
            time = (new Date()).getTime(),
            i;

          for (i = -19; i <= 0; i++) {
            data.push({
              x: time + i * 1000,
              y: 0
            });
          }
          return data;
        })()
      }]
    });
  });
}());
