var currentDiv = 1;
$(document).ready(function(){
    $('#right').click(function(){
        currentDiv += 1;
        if(currentDiv>6){
            currentDiv=6;
        }
        $('.hiddenones').hide();
        $('#health-'+currentDiv).show();
        console.log(currentDiv);
    });
    $('#left').click(function(){
        currentDiv -= 1;
        if(currentDiv < 1){
            currentDiv = 1;
        }
        $('.hiddenones').hide();
        $('#health-'+currentDiv).show();
        console.log(currentDiv);
    });
})
    

function makeHighCharts(calories,carbs,fat,protein,sodium,sugar, dates) {

        $('#calories').highcharts({
            title: {
                text: 'Daily calorie intake',
                x: -20 //center
            },
            subtitle: {
                
                x: -20
            },
            xAxis: {
                categories: dates
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
                data: calories,
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
                categories: dates
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
                data: carbs,
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
                categories: dates
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
                data: fat,
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
                categories: dates
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
                data: protein,
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
                categories: dates
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
                data: sodium,
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
                categories: dates
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
                data: sugar,
                color: '#FF66CC'
            }]
        });

}


$(window).resize(function() {
    height = window.height
    width = $("#chartRow").width() / 2
    chart.setSize(width, height, doAnimation = true);
});





