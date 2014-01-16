$(function() {
	//Page is done loading;
	$('#portfolio img').click(function(){
		var src = $(this).attr('src');
		$('#frame img').attr('src',src);
		$('#overlay').fadeIn();
		$('#frame').fadeIn('slow');
	});

	$('#overlay').click(function(){
		$(this).fadeOut();
		$('#frame').fadeOut();
	});
});