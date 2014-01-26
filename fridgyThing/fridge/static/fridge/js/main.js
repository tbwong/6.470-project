$(function(){
	function login() {
		var username = $("#username").val();
		var password = $("#password").val();

		$("#username").val("");
		$("#password").val("");
	}

	$('#register-button').click(function(){
		$('#popupBackground').fadeIn();
		$('#register-popup').show('slow');
	});
	$('#popupBackground').click(function(){
		$('#popupBackground').fadeOut();
		$('#register-popup').hide('fast');

	});
});