var page = ''

$(document).ready(function(){
	//The page has loaded
	
	//$('#control-panel-holder #control-content').html(page);
	$('.showpiece').hide();
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
	$('.sidebarHolder .sidebar li a').click(function(){
		if(page!=$(this).attr('id')){
			showShowpiece('#showpiece-'+$(this).attr('id'));
			showControls('#control-'+$(this).attr('id'));

		}
		page = $(this).attr('id');
		//$('#control-panel-holder #control-content').html(page);
	});
});

