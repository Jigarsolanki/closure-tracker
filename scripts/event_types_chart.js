define(['fireEventTracker', 'jquery', 'highCharts'], function(
  fireEventTracker) {

    var chart, chartDataFormartter, setDefaultChart;

    setDefaultChart = function () {
      chart.series[0].xAxis.setCategories(['']);
      chart.series[0].setData([0]);
    }

    chart = new Highcharts.Chart({
      chart: {
          renderTo: 'ctracker-event-type-chart',
          type: 'bar',
          marginRight: 40,
          events: {
            load: function() {

              var series, update;
              series = this.series[0],
              that = this;

              update = function () {

                var eventTypes = [],
                  eventCounts = [],
                  newHeight;

                $.each(fireEventTracker.getAggregatedEventData(),
                  function (k,v) {
                  eventCounts.push(v);
                  eventTypes.push(k);
                });
                if(eventTypes.length > 10)  {

                  newHeight = eventTypes.length *  19;
                  that.chartHeight = newHeight;
                  $('#ctracker-event-type-chart .highcharts-container')
                    .css('overflow-y', 'scroll');
                  $('#ctracker-event-type-chart svg').attr('height', newHeight);
                }
                if(eventTypes.length == 0){
                  setDefaultChart();
                } else{
                  series.xAxis.setCategories(eventTypes);
                  series.setData(eventCounts);
                }
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

  return {
    clear: function() {
      setDefaultChart();
    }
  }
});
