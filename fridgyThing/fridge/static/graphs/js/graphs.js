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
    $(window).resize()
})
    

function makeHighCharts(calData,carbsData,fatData,proteinData,sodiumData,sugarData, dates) {

    function drawCalories(x,y) {
        calorieChart = new Highcharts.Chart({
            chart: {
                height : x , 
                width : y ,
                renderTo: 'calories-container',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                reflow: true
            },
            title: {
                text: 'Daily calorie intake'
            },
            xAxis: {
                categories: dates
            },
            yAxis: {
                title: {
                    text: 'Calories (g)'
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
                type: 'line',
                name: 'Tiffany',
                data: calData
            }]
        });
    }
    drawCalories('#calories-container'.width, '#calories-container'.height) ; 
    console.log('#calories-container'.width, '#calories-container'.height)

    function drawCarbs(x, y) {
        carbChart = new Highcharts.Chart({
            chart: {
                height : x , 
                width : y ,
                renderTo: 'carbs-container',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                reflow: true
            },
            title: {
                text: 'Daily carb intake'
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
                type: 'line',
                name: 'Tiffany',
                data: carbsData,
                color: '#0033FF'
            }]
        });
    }
    drawCarbs('#carbs-container'.width, '#carbs-container'.height);
    console.log($('#carbs-container').width, $('#carbs-container').height)    



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


$('#calories').resize(function() {
    calorieChart.redraw();
});
$('#calories').resize(function() {
    carbChart.redraw();
});





