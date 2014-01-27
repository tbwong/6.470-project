var currentDiv = 1;
$(document).ready(function(){
	$("#1").css("background-color", "white");
	
	$(".nutrient").click(function() {
		var maind = "#health-" + (this).id;
		var number = parseInt((this).id, 10);
		var main = "#"+currentDiv;
		var mainn = "#" + (this).id;
		$(main).css("background-color", "");
		$(mainn).css("background-color", "white");
		if (currentDiv < number){
			$('.hiddenones').hide("slide", {direction:"left"});
			$(maind).show("slide", {direction:"right"});	
		}
		else {
			$('.hiddenones').hide("slide", {direction:"right"});
			$(maind).show("slide", {direction:"left"});
		}
		currentDiv = number;
	});
	
    $('#right').click(function(){
        if(currentDiv<6){
			currentDiv += 1;
			$('.hiddenones').hide("slide", {direction:"left"});
			$('#health-'+currentDiv).show("slide", { direction: "right" });
			var main = "#"+currentDiv;
			var sub = currentDiv -1;
			var mainn = "#"+sub;
			$(mainn).css("background-color", "");
			$(main).css("background-color", "white");
			console.log(currentDiv);
		}
    });  
	
    $('#left').click(function(){
        if(currentDiv > 1){
			currentDiv -= 1;
			$('.hiddenones').hide("slide", {direction:"right"});
			$('#health-'+currentDiv).show("slide", {direction:"left"});
			var main = "#"+currentDiv;
			var sub = currentDiv + 1;
			var mainn = "#"+sub;
			$(mainn).css("background-color", "");
			$(main).css("background-color", "white");
			console.log(currentDiv);
		}
    });
//press > or < to navigate through graphs	
	$(document).keypress(function(e) {
		console.log(e.keyCode);
		if (e.keyCode === 46) {
			e.preventDefault();
			if(currentDiv<6){
				currentDiv += 1;
				$('.hiddenones').hide("slide", {direction:"left"});
				$('#health-'+currentDiv).show("slide", { direction: "right" });
				var main = "#"+currentDiv;
				var sub = currentDiv -1;
				var mainn = "#"+sub;
				$(mainn).css("background-color", "");
				$(main).css("background-color", "white");
				console.log(currentDiv);
			};
		};
	});
	
	$(document).keypress(function(e) {
		console.log(e.keyCode);
		if (e.keyCode === 44) {
			e.preventDefault();
			if(currentDiv>1){
				currentDiv -= 1;
				$('.hiddenones').hide("slide", {direction:"right"});
				$('#health-'+currentDiv).show("slide", { direction: "left" });
				var main = "#"+currentDiv;
				var sub = currentDiv +1;
				var mainn = "#"+sub;
				$(mainn).css("background-color", "");
				$(main).css("background-color", "white");
				console.log(currentDiv);
			};
		};
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
                }],
                plotBands: [{ // visualize the weekend
                    from: highCal,
                    to: lowCal,
                    color: 'rgba(68, 170, 213, .2)'
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
                }],
                plotBands: [{ // visualize the weekend
                    from: highCarb,
                    to: lowCarb,
                    color: 'rgba(68, 170, 213, .2)'
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
                }],
                plotBands: [{ // visualize the weekend
                    from: lowFat,
                    to: highFat,
                    color: 'rgba(68, 170, 213, .2)'
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
                }],
                plotBands: [{ // visualize the weekend
                    from: highProtein,
                    to: lowProtein,
                    color: 'rgba(68, 170, 213, .2)'
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
                }],
                plotBands: [{ // visualize the weekend
                    from: highSodium,
                    to: highSodium+2,
                    color: 'rgba(68, 170, 213, .2)'
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
                color: '#FF3300'
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
                }],
                plotBands: [{ // visualize the weekend
                    from: highSugar,
                    to: highSugar+2,
                    color: 'rgba(68, 170, 213, .2)'
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
                color: '#FF3300'
            }]
        });
        
    }
    drawSugar('#sodium-container'.width, '#sodium-container'.height);
}





