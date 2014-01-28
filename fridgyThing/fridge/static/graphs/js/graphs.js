var currentDiv = 1;
$(document).ready(function(){

	$("#1").css("background-color", "white");
	
	$(".nutrient").on("mouseenter", function() {
		if (parseInt((this).id, 10) !== currentDiv) {
			var mainn = "#" + (this).id;
			$(mainn).css("background-color", "rgb(255, 228, 232)");
			
		}
	});
	
	$(".nutrient").on("mouseleave", function() {
		if (parseInt((this).id, 10) !== currentDiv) {
			var mainn = "#" + (this).id;
			$(mainn).css("background-color", "");
			
		}
	});

	
	$(".nutrient").click(function() {
		var maind = "#health-" + (this).id;
		var number = parseInt((this).id, 10);
		
		$("#right").show();
		$("#left").show();
		if (number === 6) {
			$("#right").hide();
		}
		else if (number ===1) {
			$("#left").hide();
		} 
		
		var main = "#"+currentDiv;
		var mainn = "#" + (this).id;
		var d = "#d" + (this).id;
		$(main).css("background-color", "");
		$(mainn).css("background-color", "white");
		var m = "#m" +(this.id);
		$(".feedback").hide();
		$(m).show();
		$(".des").hide();
		$(d).show();
		if (currentDiv < number){
			$('.hiddenones').hide("fade");
			$(maind).show("slide", {direction:"right"});
            $(maind).attr('width','calc(100% - 300px)');
            $(window).resize();
		}
		else {
			$('.hiddenones').hide("fade");
			$(maind).show("slide", {direction:"left"});
            $(window).resize();
        }
		currentDiv = number;
	});
	
    $('#right').click(function(){
		$(this).blur();
        if(currentDiv<6){
			currentDiv += 1;
			$('.hiddenones').hide("fade");
			$('#health-'+currentDiv).show("slide", { direction: "right" });
            $('#health-'+currentDiv).attr('width','calc(100% - 300px)');
            $(window).resize();

			var main = "#"+currentDiv;
			var sub = currentDiv -1;
			var mainn = "#"+sub;
			var d = "#d" + currentDiv;
			var m = "#m" +currentDiv;
			$(".feedback").hide();
			$(m).show();
			$(mainn).css("background-color", "");
			$(main).css("background-color", "white");
			$(".des").hide();
			$(d).show();
			if (currentDiv === 6) {
				$("#right").hide();
			}
			else if (currentDiv ===2) {
				$("#left").show();
			}
			console.log(currentDiv);
		}
    });  
	
    $('#left').click(function(){
		$(this).blur();
        if(currentDiv > 1){
			currentDiv -= 1;
			$('.hiddenones').hide("fade");
			$('#health-'+currentDiv).show("slide", {direction:"left"});
            $('#health-'+currentDiv).attr('width','calc(100% - 300px)');
            $(window).resize();
			
            var main = "#"+currentDiv;
			var sub = currentDiv + 1;
			var mainn = "#"+sub;
			var d = "#d" + currentDiv;
			var m = "#m" +currentDiv;
			$(".feedback").hide();
			$(m).show();
			$(mainn).css("background-color", "");
			$(main).css("background-color", "white");
			$(".des").hide();
			$(d).show();
			if (currentDiv ===1) {
				$("#left").hide();
			}
			else if (currentDiv ===5) {
				$("#right").show();
			}
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
				$('.hiddenones').hide("fade");
				$('#health-'+currentDiv).show("slide", { direction: "right" });
                $('#health-'+currentDiv).attr('width','calc(100% - 300px)');
                $(window).resize();
				
                var main = "#"+currentDiv;
				var sub = currentDiv -1;
				var mainn = "#"+sub;
				$(mainn).css("background-color", "");
				$(main).css("background-color", "white");
				var d = "#d" + currentDiv;
				$(".des").hide();
				$(d).show();
				var m = "#m" +currentDiv;
				$(".feedback").hide();
				$(m).show();
				if (currentDiv === 6) {
					$("#right").hide();
				}
				else if (currentDiv ===2) {
					$("#left").show();
				}
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
				$('.hiddenones').hide("fade");
				$('#health-'+currentDiv).show("slide", { direction: "left" });
                $('#health-'+currentDiv).attr('width','calc(100% - 300px)');
                $(window).resize();

				var main = "#"+currentDiv;
				var sub = currentDiv +1;
				var mainn = "#"+sub;
				$(mainn).css("background-color", "");
				$(main).css("background-color", "white");
				var d = "#d" + currentDiv;
				$(".des").hide();
				$(d).show();
				var m = "#m" +currentDiv;
				$(".feedback").hide();
				$(m).show();
				if (currentDiv ===1) {
					$("#left").hide();
				}
				else if (currentDiv ===5) {
					$("#right").show();
				}
				console.log(currentDiv);
			};
		};
	});
	
    

    
    $('#calories-container').resize(function() {
        $(this).redraw();
    });
    $('#carbs-container').resize(function() {
        $(this).redraw();
    });
    $('#fat-container').resize(function() {
        $(this).redraw();
    });
    $('#protein-container').resize(function() {
        $(this).redraw();
    });
    $('#sodium-container').resize(function() {
        $(this).redraw();
    });
    $('#sugar-container').resize(function() {
        $(this).redraw();
    });
})
    

function makeHighCharts(calData,carbsData,fatData,proteinData,sodiumData,sugarData,dates,name,highCal,lowCal,highCarb,lowCarb,highFat,lowFat,highProtein,lowProtein,highSodium,highSugar) {
	console.log(calData)
	Highcharts.theme = {
		colors: ["#DDDF0D", "#7798BF", "#55BF3B", "#DF5353", "#aaeeee", "#ff0066", "#eeaaee",
			"#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
		chart: {
			backgroundColor: {
				linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
				stops: [
					[0, 'rgb(96, 96, 96)'],
					[1, 'rgb(16, 16, 16)']
				]
			},
			borderWidth: 0,
			borderRadius: 15,
			plotBackgroundColor: null,
			plotShadow: false,
			plotBorderWidth: 0,
			width:null,
			height:null
			
		},
		title: {
			style: {
				color: '#FFF',
				font: '16px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
			}
		},
		subtitle: {
			style: {
				color: '#DDD',
				font: '12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
			}
		},
		xAxis: {
			gridLineWidth: 0,
			lineColor: '#999',
			tickColor: '#999',
			labels: {
				style: {
				color: '#999',
				fontWeight: 'bold'
				}
			},
			title: {
				style: {
				color: '#AAA',
				font: 'bold 12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
				}
			}
		},
		yAxis: {
			alternateGridColor: null,
			minorTickInterval: null,
			gridLineColor: 'rgba(255, 255, 255, .1)',
			minorGridLineColor: 'rgba(255,255,255,0.07)',
			lineWidth: 0,
			tickWidth: 0,
			labels: {
				style: {
					color: '#999',
					fontWeight: 'bold'
				}
			},
			title: {
				style: {
					color: '#AAA',
					font: 'bold 12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
				}
			}
		},
		legend: {
			enabled:false
		},
		labels: {
			style: {
				color: '#CCC'
			}
		},
		tooltip: {
			backgroundColor: {
				linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
				stops: [
					[0, 'rgba(96, 96, 96, .8)'],
					[1, 'rgba(16, 16, 16, .8)']
				]
			},
			borderWidth: 0,
			style: {
				color: '#FFF'
			}
		},
	
	
		plotOptions: {
			series: {
				shadow: true
			},
			line: {
				dataLabels: {
					color: '#CCC'
				},
				marker: {
					lineColor: '#333'
				}
			},
			spline: {
				marker: {
					lineColor: '#333'
				}
			},
			scatter: {
				marker: {
					lineColor: '#333'
				}
			},
			candlestick: {
				lineColor: 'white'
			}
		},
	
		toolbar: {
			itemStyle: {
				color: '#CCC'
			}
		},
	
		navigation: {
			buttonOptions: {
				symbolStroke: '#DDDDDD',
				hoverSymbolStroke: '#FFFFFF',
				theme: {
					fill: {
					linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
					stops: [
						[0.4, '#606060'],
						[0.6, '#333333']
					]
					},
					stroke: '#000000'
				}
			}
		},
	
		// scroll charts
		rangeSelector: {
			buttonTheme: {
				fill: {
					linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
					stops: [
					[0.4, '#888'],
					[0.6, '#555']
					]
				},
				stroke: '#000000',
				style: {
					color: '#CCC',
					fontWeight: 'bold'
				},
				states: {
					hover: {
						fill: {
							linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
							stops: [
								[0.4, '#BBB'],
								[0.6, '#888']
							]
						},
						stroke: '#000000',
						style: {
							color: 'white'
						}
					},
					select: {
						fill: {
							linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
							stops: [
								[0.1, '#000'],
								[0.3, '#333']
							]
						},
						stroke: '#000000',
						style: {
							color: 'yellow'
						}
					}
				}
			},
			inputStyle: {
				backgroundColor: '#333',
				color: 'silver'
			},
			labelStyle: {
				color: 'silver'
			}
		},

		navigator: {
			handles: {
				backgroundColor: '#666',
				borderColor: '#AAA'
			},
			outlineColor: '#CCC',
			maskFill: 'rgba(16, 16, 16, 0.5)',
			series: {
				color: '#7798BF',
				lineColor: '#A6C7ED'
			}
		},

		scrollbar: {
			barBackgroundColor: {
				linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
				stops: [
					[0.4, '#888'],
					[0.6, '#555']
				]
			},
			barBorderColor: '#CCC',
			buttonArrowColor: '#CCC',
			buttonBackgroundColor: {
				linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
				stops: [
					[0.4, '#888'],
					[0.6, '#555']
				]
			},
			buttonBorderColor: '#CCC',
			rifleColor: '#FFF',
			trackBackgroundColor: {
				linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
				stops: [
					[0, '#000'],
					[1, '#333']
				]
			},
			trackBorderColor: '#666'
		},

	   // special colors for some of the demo examples
		legendBackgroundColor: 'rgba(48, 48, 48, 0.8)',
		legendBackgroundColorSolid: 'rgb(70, 70, 70)',
		dataLabelsColor: '#444',
		textColor: '#E0E0E0',
		maskColor: 'rgba(255,255,255,0.3)'
	};

	// Apply the theme
	Highcharts.setOptions(Highcharts.theme);

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
                    from: highCal[0],
                    to: lowCal[0],
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
                type: 'column',
                name: name,
                data: calData,
                color: '#CC99FF'

            }],
            series: [{
                type: 'line',
                name: 'upper',
                data: highCal,
                color: '#CC99FF'

            }],
            series: [{
                type: 'line',
                name: 'lower',
                data: lowCal,
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
                    from: highCarb[0],
                    to: lowCarb[0],
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
                type: 'column',
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
                    from: lowFat[0],
                    to: highFat[0],
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
                    from: highProtein[0],
                    to: lowProtein[0],
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
                    from: highSodium[0],
                    to: highSodium[0]+2,
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
                    from: highSugar[0],
                    to: highSugar[0]+2,
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





