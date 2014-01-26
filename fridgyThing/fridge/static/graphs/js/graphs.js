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

    
    $('#calories-container').resize(function() {
        calorieChart.redraw();
    });
    $('#carbs-container').resize(function() {
        carbChart.redraw();
    });
    $('#fat-container').resize(function() {
        fatChart.redraw();
    });
    $('#protein-container').resize(function() {
        proteinChart.redraw();
    });
    $('#sodium-container').resize(function() {
        sodiumChart.redraw();
    });
    $('#sugar-container').resize(function() {
        sugarChart.redraw();
    });
})
    

function makeHighCharts(calData,carbsData,fatData,proteinData,sodiumData,sugarData,dates,name,highCal,lowCal,highCarb,lowCarb,highFat,lowFat,highProtein,lowProtein,highSodium,highSugar) {

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
                categories: dates,
                labels:
                {
                    enabled: false
                }

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
                name: name,
                data: calData,
                color: '#CC99FF'

            },
            {
                type: 'line',
                name: 'low bound',
                data: lowCal,
                color: '#99FF66'
            },
            {
                type: 'line',
                name: 'high bound',
                data: highCal,
                color: '#99FF66'
            }]
        });
    }
    drawCalories('#calories-container'.width, '#calories-container'.height) 

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
                categories: dates,
                labels:
                {
                    enabled: false
                }

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
                name: name,
                data: carbsData,
                color: '#0033FF'
            },
            {
                type: 'line',
                name: 'low bound',
                data: lowCarb,
                color: '#99FF66'
            },
            {
                type: 'line',
                name: 'high bound',
                data: highCarb,
                color: '#99FF66'
            }]
        });
    }
    drawCarbs('#carbs-container'.width, '#carbs-container'.height);   


    function drawFats(x, y) {
        fatChart = new Highcharts.Chart({
            chart: {
                height : x , 
                width : y ,
                renderTo: 'fat-container',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                reflow: true
            },
            title: {
                text: 'Daily fat intake'
            },
            xAxis: {
                categories: dates,
                labels:
                {
                    enabled: false
                }

            },
            yAxis: {
                title: {
                    text: 'Fats (g)'
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
                name: name,
                data: fatData,
                color: '#339900'
            },
            {
                type: 'line',
                name: 'low bound',
                data: lowFat,
                color: '#99FF66'
            },
            {
                type: 'line',
                name: 'high bound',
                data: highFat,
                color: '#99FF66'
            }]
        });
    }
    drawFats('#fat-container'.width, '#fat-container'.height);

    function drawProtein(x, y) {
        proteinChart = new Highcharts.Chart({
            chart: {
                height : x , 
                width : y ,
                renderTo: 'protein-container',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                reflow: true
            },
            title: {
                text: 'Daily protein intake'
            },
            xAxis: {
                categories: dates,
                labels:
                {
                    enabled: false
                }

            },
            yAxis: {
                title: {
                    text: 'Protein (g)'
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
                name: name,
                data: proteinData,
                color: '#FF3300'
            },
            {
                type: 'line',
                name: 'low bound',
                data: lowProtein,
                color: '#99FF66'
            },
            {
                type: 'line',
                name: 'high bound',
                data: highProtein,
                color: '#99FF66'
            }]
        });
    }
    drawProtein('#protein-container'.width, '#protein-container'.height);

    function drawSodium(x, y) {
        sodiumChart = new Highcharts.Chart({
            chart: {
                height : x , 
                width : y ,
                renderTo: 'sodium-container',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                reflow: true
            },
            title: {
                text: 'Daily sodium intake'
            },
            xAxis: {
                categories: dates,
                labels:
                {
                    enabled: false
                }

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
                name: name,
                data: sodiumData,
                color: '#CC0033'
            },
            {
                type: 'line',
                name: 'high bound',
                data: highSodium,
                color: '#99FF66'
            }]
        });
    }
    drawSodium('#sodium-container'.width, '#sodium-container'.height);

    function drawSugar(x, y) {
        sugarChart = new Highcharts.Chart({
            chart: {
                height : x , 
                width : y ,
                renderTo: 'sugar-container',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                reflow: true
            },
            title: {
                text: 'Daily sugar intake'
            },
            xAxis: {
                categories: dates,
                labels:
                {
                    enabled: false
                }
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
                name: name,
                data: sugarData,
                color: '#FF66CC'
            },
            {
                type: 'line',
                name: 'high sugar',
                data: highSugar,
                color: '#99FF66'
            }]
        });
        
    }
    drawSugar('#sodium-container'.width, '#sodium-container'.height);
}





