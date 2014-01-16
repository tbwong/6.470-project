var page = ''

$(document).ready(function(){
	//The page has loaded
	
	//$('#control-panel-holder #control-content').html(page);
	$('.showpiece').hide();
	$('.controlGroup').hide();
	function showShowpiece(page){
		$('.showpiece').hide();
		$(page).show('slow');
		console.log(page);
	}
	function showControls(control){
		$('.controlGroup').hide();
		$(control).show('slow');
		console.log(page);
	}
	showShowpiece('#showpiece-fridge');
	showControls('#control-fridge');

	// $('.sidebarHolder .sidebar li a').click(function(){
	// 	if(page!=$(this).attr('id')){
	// 		showShowpiece('#showpiece-'+$(this).attr('id'));
	// 		showControls('#control-'+$(this).attr('id'));
	// 	}
	// 	page = $(this).attr('id');
	// 	//$('#control-panel-holder #control-content').html(page);
	// });

	//TODO: need to do this in a for loop with values posibly from inside the html so I can use django variables
    $('.ingredientPie').each(function(){
    	 var chart = new Highcharts.Chart({
	        chart: {
	        	renderTo: this,
	        	backgroundColor: null,
	            plotBackgroundColor: null,
	            plotBorderWidth: null,
	            plotShadow: false
	        },
	        title: {
	            text: null
	        },
	        tooltip: {
	        	enabled: false
	    	    // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	        },
	        plotOptions: {
	            pie: {
	                allowPointSelect: false,
	                cursor: null,
	                dataLabels: {
	                    enabled: false,
	                    // color: '#000000',
	                    // connectorColor: '#000000',
	                    // format: '<b>{point.name}</b>: {point.percentage:.1f} %'
	                },
	                point: {
	                	enabled:null,
						events: {
							click: function(event){
								//nothing
							},
							// legendItemClick: null,
							mouseOut: function(event){
								//nothing
							},
							mouseOver: function(event){
								//nothing
							}
							// remove: null,
							// select: null,
							// unselect: null,
							// update: null
						}
					}
	            }
	        },
	        series: [{
	            type: 'pie',
	            name: 'Ingredient',
	            data: [
	                ['Firefox',   45.0],
	                ['IE',       26.8]
	            ]
		    }]
    	});
    });

	// $('.foodPic').mouseenter(function(){
	// 	$(this).children('.ingredientPie').fadeIn();
	// });
	// $('.ingredientPie').mouseout(function(){
	// 	$(this).fadeOut();
	// });

	$('#addIng').click(function(){
		$('#popupBackground').fadeIn();
		$('#addIng-popup').show('slow');
	});
	$('#popupBackground').click(function(){
		$('#popupBackground').fadeOut();
		$('#addIng-popup').hide('fast');
	});
});
function getRecipies(Ingredients){
	var url =' http://api.yummly.com/v1/api/recipes?_app_id=ccb5dd3c&_app_key=8f8f5a9fd5023ce15ea82f24ee8aac14&q=?&requirePictures=true&maxTotalTimeInSeconds=3'
	var i =1;
	for(i;i<Ingredients.length;i++){
		url = url+'&allowedIngredient[]='+Ingredients[i].replace(/ /g, '');
	}
	$.ajax({
		url: url,
		dataType: "jsonp",
		success: function (data) {
			console.log(data)
			alert(data);
		}
	});
}

