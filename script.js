$(function() {
  var chart;

  $(document).ready(function() {
    chart = new Highcharts.Chart({
      chart: {
        renderTo: 'container',
        type: 'area',
        backgroundColor: '#242222'
      },
      title: {
        text: '@narul1 - telegram'
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          day: '%a'
        },
        gridLineColor: '#7851a9',
        labels: {
          style: {
            color: '#7851a9'
          }
        }
      },
      yAxis: {
        allowDecimals: false,
        labels: {
          formatter: function() {
            if (this.value > 1000) {
              return this.value / 1000 + 'k r/s';
            } else {
              return this.value + ' r/s';
            }
          }
        }
      },
      tooltip: {
        pointFormat: 'Requests: {point.y:,.0f}'
      },
      colors: [{
        linearGradient: [0, 0, 0, 0],
        stops: [
          [0, 'rgba(120,81,169,1)']
        ]
      }],
      plotOptions: {
        area: {
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [
              [0, '#7851a9'],
              [1, Highcharts.Color('#7851a9').setOpacity(0).get('rgba')]
            ]
          },
          pointStart: new Date().getTime(),
          marker: {
            enabled: true,
            symbol: 'circle',
            radius: 2,
            states: {
              hover: {
                enabled: true
              }
            }
          }
        }
      },
      series: [{
        name: 'Requests',
        data: []
      }]
    });

    setInterval(function() {
      $.ajax({
        url: '/server-status?auto',
        dataType: 'text',
        success: function(data) {
          var current = parseInt(data.match(/Total Accesses: (\d+)/)[1]);
          var series = chart.series[0];
          var shift = series.data.length > 40;
          series.addPoint([new Date().getTime(), current], true, shift);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log(errorThrown);
        }
      });
    }, 1000);
  });
});
