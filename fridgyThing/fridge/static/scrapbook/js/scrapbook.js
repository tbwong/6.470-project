	$('#addIng').click(function(){
		$('#popupBackground').fadeIn();
		$('#addIng-popup').show('slow');
	});
	$('#popupBackground').click(function(){
		$('#popupBackground').fadeOut();
		$('#addIng-popup').hide('fast');
		$('#recipeInfo').hide('fast');
		$('.rInfo').hide('fast');
		$('#delIng-popup').hide('fast');
	});
	