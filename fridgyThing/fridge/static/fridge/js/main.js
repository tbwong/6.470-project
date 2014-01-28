$(function(){
	function login() {
		var username = $("#username").val();
		var password = $("#password").val();

		$("#username").val("");
		$("#password").val("");
	}

	$('#register-button').click(function(){
		$('#popupBackground').fadeIn();
		$('#register-popup').fadeIn();
	});
	$('#popupBackground').click(function(){
		$('#popupBackground').fadeOut();
		$('#register-popup').fadeOut();

	});
});