$(document).ready(function() {
//items hover to make icons visible
/*	$("#food").on("mouseenter", function() {
		if ($("#foodedit").length==0 && $("#noteedit").length==0) {
			$(this).css("background-color", "white");
		}
	});
	
	$("#food").on("mouseleave", function() {
		if ($("#foodedit").length==0 && $("#noteedit").length==0) {
			$(this).css("background-color", "#FFB2D8");
		}
	}); */
		
	$("#food-list").on("mouseenter", ".hov", function() {
		if ($("#foodedit").length==0 && $("#noteedit").length==0) {
			$(this).find(".closer").removeClass("invisible");
			var id= "#"+(this).id;
			$("#memo").find(id).css("background-color", "#feeaea");
			$(this).css("background-color", "#feeaea");
		}
	});
	
	$("#food-list").on("mouseleave", ".hov", function() {
		if ($("#foodedit").length==0 && $("#noteedit").length==0) {
			$(this).find(".closer").addClass("invisible");
			$(this).css("background-color", "");
			var id= "#"+(this).id;
			$("#memo").find(id).css("background-color", "");
		}
	});
	
//notes hover to make icons visible
	$("#memo").on("mouseenter", ".memohov", function() {
		if ($("#foodedit").length==0 && $("#noteedit").length==0) {
			$(this).find(".closer").removeClass("invisible");
			var id= "#"+(this).id;
			$("#food-list").find(id).css("background-color", "#feeaea");
			$(this).css("background-color", "#feeaea");
		}
	});
	
	$("#memo").on("mouseleave", ".memohov", function() {
		if ($("#foodedit").length==0 && $("#noteedit").length==0) {
			$(this).find(".closer").addClass("invisible");
			$(this).css("background-color", "");
			var id= "#"+(this).id;
			$("#food-list").find(id).css("background-color", "");
		}
	});

//items click "x" to remove
	$("#food-list").on("click", ".remove", function() {
		if ($("#foodedit").length==0 && $("#noteedit").length==0) {
			$(this).closest(".hov").children(".submitremove").submit();
		}
	});

//notes click "x" to remove
	$("#memo").on("click", ".remove", function() {
		if ($("#foodedit").length==0 && $("#noteedit").length==0) {
			$(this).closest(".memohov").children(".submitremove").submit();
		}
	});
	
//print NEED TO WORK ON THIS NOT WORKING ATM!!!!!
/*
	$(".print").printThis ({
		debug: false, * show the iframe for debugging
		importCSS: true, * import page CSS
		printContainer: true, * grab outer container as well as the contents of the selector
		loadCSS: "path/to/my.css", * path to additional css file
		pageTitle: "", * add title to print page
		removeInline: false, * remove all inline styles from print elements
		printDelay: 333, * variable print delay S. Vance
		header: null * prefix to html
	});
*/
		
//set cursor to end
	$.fn.setCursorToTextEnd = function() {
		$initialVal = this.val();
		this.val('');
		this.val($initialVal);
	};

//items click "pencil" to edit
	$("#food-list").on("click", ".edit", function() {
		if ($("#foodedit").length==0 && $("#noteedit").length==0) {
			var editfood = $(this).closest(".hov").find("#editfood");
			$(this).closest(".shoppingdisplay").hide();
			editfood.attr('id', 'foodedit');
			editfood.focus();
			editfood.setCursorToTextEnd();
		}
	});

//notes click "pencil" to edit
	$("#memo").on("click", ".edit", function() {
		if ($("#foodedit").length==0 && $("#noteedit").length==0) {
			var editnote = $(this).closest(".memohov").find("#editnote");
			$(this).closest(".memodisplay").hide();
			editnote.attr('id', 'noteedit');
			editnote.focus();
			editnote.setCursorToTextEnd();
		}
	});

//gen note click to edit
	$(".note").click(function() {
		if ($("#foodedit").length==0 && $("#noteedit").length==0) {
			var note = $(this);
			note.attr('id', 'othernote');
		}
	});
	
//add to fridge!
	$("#addbutton").on("click", function() {
		$("#addIng-group").submit();
	});

	$('.hov').on('click', '.add', function(){
		$('#popupBackground').fadeIn();
		$('#addIng-popup').fadeIn();
		var okay = $(this).closest('.hov').attr("id");
		var okayy = $(this).siblings('#text').text();
		$('#addIng-popup').find('#id').val(okay);
		$('#addIng-popup').find('#foodname').val(okayy);
		$('#addIng-popup').find('#foodname').focus();
		$('#addIng-popup').find('#foodname').setCursorToTextEnd();
	});
	
	$('#popupBackground').click(function(){
		$('#popupBackground').fadeOut();
		$('#addIng-popup').hide('fast');
	});
	
	$("#memocontent").click(function(){
		$("#foodedit").closest('.submitedit').submit(); 
		$("#noteedit").closest('.submitedit').submit();
	});

});

$(document).click(function(e) {
	if (e.target.id !== 'foodedit' && e.target.id !== 'noteedit' && e.target.id !== "memocontent" && e.target.id!== "listspace") {
		$("#foodedit").closest('.submitedit').submit(); 
		$("#noteedit").closest('.submitedit').submit();
		var a=$("#memocontent").val();
		$("#other").val(a);
		$("#othernote").children('.submitnote').submit();
	}
});