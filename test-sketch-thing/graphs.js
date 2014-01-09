$(function () {
        $('#container').highcharts({
            title: {
                text: 'Daily calorie intake',
                x: -20 //center
            },
            subtitle: {
                
                x: -20
            },
            xAxis: {
                categories: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat',
                    'Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri']
            },
            yAxis: {
                title: {
                    text: 'Calories'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: '°C'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{
                name: 'Tiffany',
                data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
            }]
        });
    });
    
