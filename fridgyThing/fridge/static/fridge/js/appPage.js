var page = ''

$(document).ready(function(){
	

	//The page has loaded
	
	//hover on pictures:just implemented
	$("#recipeResults").on("mouseenter", ".recipeResult", function() {
		$(this).css("opacity", "0.5");
	});

	$("#recipeResults").on("mouseleave", ".recipeResult", function() {
		$(this).css("opacity", "");
	});

	$("#add").on("click", function() {
		$("#addIng-group").submit();
	});

	//$('#control-panel-holder #control-content').html(page);
	$('.showpiece').hide();
	$('.controlGroup').hide();
	function showControls(control){
		$(control).show(200);
		console.log(page);
	}
	function showShowpiece(page){
		$(page).show(800);
		console.log(page);
	}
	showControls('#control-fridge')
	showShowpiece('#showpiece-fridge');
	showShowpiece('#noFridge');
	

	// $('.sidebarHolder .sidebar li a').click(function(){
	// 	if(page!=$(this).attr('id')){
	// 		showShowpiece('#showpiece-'+$(this).attr('id'));
	// 		showControls('#control-'+$(this).attr('id'));
	// 	}
	// 	page = $(this).attr('id');
	// 	//$('#control-panel-holder #control-content').html(page);
	// });

	//TODO: need to do this in a for loop with values posibly from inside the html so I can use django variables
    // $('.ingredientPie').each(function(){
    // 	 var chart = new Highcharts.Chart({
	   //      chart: {
	   //      	renderTo: this,
	   //      	backgroundColor: null,
	   //          plotBackgroundColor: null,
	   //          plotBorderWidth: null,
	   //          plotShadow: false
	   //      },
	   //      title: {
	   //          text: null
	   //      },
	   //      tooltip: {
	   //      	enabled: false
	   //  	    // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	   //      },
	   //      plotOptions: {
	   //          pie: {
	   //              allowPointSelect: false,
	   //              cursor: null,
	   //              dataLabels: {
	   //                  enabled: false,
	   //                  // color: '#000000',
	   //                  // connectorColor: '#000000',
	   //                  // format: '<b>{point.name}</b>: {point.percentage:.1f} %'
	   //              },
	   //              point: {
	   //              	enabled:null,
				// 		events: {
				// 			click: function(event){
				// 				//nothing
				// 			},
				// 			// legendItemClick: null,
				// 			mouseOut: function(event){
				// 				//nothing
				// 			},
				// 			mouseOver: function(event){
				// 				//nothing
				// 			}
				// 			// remove: null,
				// 			// select: null,
				// 			// unselect: null,
				// 			// update: null
				// 		}
				// 	}
	   //          }
	   //      },
	   //      series: [{
	   //          type: 'pie',
	   //          name: 'Ingredient',
	   //          data: [
	   //              ['Firefox',   45.0],
	   //              ['IE',       26.8]
	   //          ]
		  //   }]
    // 	});
    // });

	// $('.foodPic').mouseenter(function(){
	// 	$(this).children('.ingredientPie').fadeIn();
	// });
	// $('.ingredientPie').mouseout(function(){
	// 	$(this).fadeOut();
	// });
	$('#addIng').click(function(){
		$('#popupBackground').fadeIn();
		$('#addIng-popup').fadeIn();
	});
	$('#popupBackground').click(function(){
		$('#popupBackground').fadeOut();
		$('#addIng-popup').fadeOut();
		$('#recipeInfo').hide('fast');
		$('.rInfo').hide('fast');
		$('#delIng-popup').hide('slide', {direction:"bottom"});
	});

	$('.recipeResult').click(function(){
		$('#popupBackground').fadeIn();
		$('#recipeInfo').fadeIn();
		var idnum = this.id;
		var dash = idnum.indexOf("-");
		idnum = idnum.substring(dash+1);
		$('#rInfo-'+idnum).show('fast');
		currentID = idnum
	});

	$('#delIng').click(function(){
		$('#popupBackground').fadeIn();
		$('#delIng-popup').fadeIn();
	});
	

});


