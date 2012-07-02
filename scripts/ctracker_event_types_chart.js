(function() {
  var jquery = CTRACKER_BASE_URL + "jquery.min.js",
      fireEventTracker = CTRACKER_BASE_URL + "fire_event_tracker.js",
      highCharts = CTRACKER_BASE_URL + "highcharts.min.js";

  require([fireEventTracker, jquery, highCharts], function(fireEventTracker) {

    var chart, chartDataFormartter;

    getChartData = function() {
      console.log(fireEventTracker.getAggregatedEventData());
    };
    chart = new Highcharts.Chart({
      chart: {
          renderTo: 'ctracker-event-type-chart',
          type: 'bar',
          events: {
            load: function() {

              var series, update;
              series = this.series[0];

              update = function () {

                var eventTypes = [],
                  eventCounts = [];

                $.each(fireEventTracker.getAggregatedEventData(),
                  function (k,v) {
                  eventCounts.push(v);
                  eventTypes.push(k);
                });
                series.xAxis.setCategories(eventTypes);
                series.setData(eventCounts);
              }
              setInterval(update, 1000);
            }
          }
      },
      title: {
        text: 'Total Number of events fired'
      },
      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          x: -100,
          y: 100,
          floating: true,
          borderWidth: 1,
          backgroundColor: '#FFFFFF',
          shadow: true
      },
      xAxis: {
          categories: [""],
          title: {
              text: null
          }
      },
      yAxis: {
          min: 0,
          title: {
              text: '',
              align: 'high'
          },
          labels: {
              overflow: 'justify'
          }
      },
      scrollbar: {
        enabled: true
      },
      tooltip: {
          formatter: function() {
              return ''+
                  this.x +': '+ this.y;
          }
      },
      credits: {
          enabled: false
      },
      series: [{
        name: 'Count',
        data: [0]
      }]
    });
  });
}());
