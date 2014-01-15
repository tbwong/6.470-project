var currentDiv = 12;
$(document).ready(function(){
    $('#right').click(function(){
        currentDiv += 1;
        if(currentDiv>6){
            currentDiv=6;
        }
        $('.hiddenones').hide();
        $('#health-'+currentDiv).show();
    });
    $('#left').click(function(){
        currentDiv -= 1;
        if(currentDiv < 1){
            currentDiv = 1;
        }
        $('.hiddenones').hide();
        $('#health-'+currentDiv).show();
    });
})
    

function makeHighCharts(calories,carbs,fat,protein,sodium,sugar) {

        $('#calories').highcharts({
            title: {
                text: 'Daily calorie intake',
                x: -20 //center
            },
            subtitle: {
                
                x: -20
            },
            xAxis: {
                categories: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat',
                    'Sun', 'Mon']
            },
            yAxis: {
                title: {
                    text: 'Calories'
                },
                plotLines: [{
                    value: 0,
                    width: 1
                }]
            },
            tooltip: {
                valueSuffix: ''
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{
                name: 'Tiffany',
                data: [6.9, 9.5, 14.5, 25.2, 23.3, 18.3, 13.9, 9.6],
                color: '#9966FF'
            }]
        });

        $('#carbs').highcharts({
            title: {
                text: 'Daily carb intake',
                x: -20 //center
            },
            subtitle: {
                
                x: -20
            },
            xAxis: {
                categories: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat',
                    'Sun', 'Mon']
            },
            yAxis: {
                title: {
                    text: 'Carbs (g)'
                },
                plotLines: [{
                    value: 0,
                    width: 1
                    
                }]
            },
            tooltip: {
                valueSuffix: ''
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{
                name: 'Tiffany',
                data: [9.9, 9.5, 14.5, 20.2, 17.3, 18.3, 13.9, 11.6],
                color: '#0033FF'
            }]
        });

        $('#fat').highcharts({
            title: {
                text: 'Daily fat intake',
                x: -20 //center
            },
            subtitle: {
                
                x: -20
            },
            xAxis: {
                categories: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat',
                    'Sun', 'Mon']
            },
            yAxis: {
                title: {
                    text: 'Fat (g)'
                },
                plotLines: [{
                    value: 0,
                    width: 1
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
                data: [19.9, 18.5, 16.5, 13.2, 12.3, 10.3, 7.9, 8.6],
                color: '#339900'
            }]
        });

        $('#protein').highcharts({
            title: {
                text: 'Daily protein intake',
                x: -20 //center
            },
            subtitle: {
                
                x: -20
            },
            xAxis: {
                categories: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat',
                    'Sun', 'Mon']
            },
            yAxis: {
                title: {
                    text: 'Sodium (g)'
                },
                plotLines: [{
                    value: 0,
                    width: 1
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
                data: [2.9, 5.5, 10.5, 7.2, 12.3, 15.3, 17.9, 19.6],
                color: '#FF3300'
            }]
        });

        $('#sodium').highcharts({
            title: {
                text: 'Daily sodium intake',
                x: -20 //center
            },
            subtitle: {
                
                x: -20
            },
            xAxis: {
                categories: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat',
                    'Sun', 'Mon']
            },
            yAxis: {
                title: {
                    text: 'Sodium (g)'
                },
                plotLines: [{
                    value: 0,
                    width: 1
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
                data: [12.9, 10.5, 8.5, 12.2, 14.3, 16.3, 18.9, 19.6],
                color: '#CC0033'
            }]
        });

        $('#sugar').highcharts({
            title: {
                text: 'Daily sugar intake',
                x: -20 //center
            },
            subtitle: {
                
                x: -20
            },
            xAxis: {
                categories: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat',
                    'Sun', 'Mon']
            },
            yAxis: {
                title: {
                    text: 'Sugar (g)'
                },
                plotLines: [{
                    value: 0,
                    width: 1
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
                data: [18.9, 19.5, 15.5, 13.2, 8.3, 3.3, 6.9, 7.6],
                color: '#FF66CC'
            }]
        });

}






